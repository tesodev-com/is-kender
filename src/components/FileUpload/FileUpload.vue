<template>
  <div class="file-upload">
    <div
      v-if="showActions"
      class="file-upload__actions"
    >
      <Button
        v-for="action in actionButtons"
        :key="action.id"
        v-bind="action.buttonProps"
        @click="handleActionClick(action.id)"
      >
        <Svg v-bind="action.svgProps"></Svg>
      </Button>
    </div>
    <Upload
      ref="uploadRef"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :maxFiles="maxFiles"
      :maxSize="maxSize"
      :description="description"
      :uploadQueueStatus="uploadQueueStatus"
      :loading="loading"
      @on-error="handleError"
      @on-upload="handleFileUpload"
    />
    <Alert
      v-for="(error, index) in errorList"
      :key="index"
      color="danger"
      fluid
    >
      <template #title>
        {{ error.message }}
      </template>
    </Alert>
    <div
      v-if="files.length && showUploadedFiles"
      class="file-upload__list"
      :class="[`file-upload__list--${template}`]"
    >
      <File
        v-for="file in files"
        :key="file.id"
        :file="file"
        :template="template"
        :preview="preview"
        @on-delete="handleFileDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { closeIcon, cloudUploadOutlineIcon, diveFolderUploadOutlineIcon } from '@/assets/icons';
import Alert from 'library-components/Alert';
import Button, { type ButtonProps } from 'library-components/Button';
import Svg, { type SvgProps } from 'library-components/Svg';
import { computed, onBeforeUnmount, ref, useTemplateRef } from 'vue';
import { File, Upload, type FileErrorMessage } from './SubComponents';
import type { CustomFile, FileUploadEvents, FileUploadProps } from './types';
import { UploadQueue, type QueueStatus } from './utils';
// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<FileUploadProps>(), {
  disabled: false,
  multiple: true,
  preview: true,
  maxSize: 1024 * 1024,
  maxConcurrentUploads: 5,
  template: 'row',
  description: 'En az 1 dosya yükleyin',
});
// defineEmits
const emit = defineEmits<FileUploadEvents>();
// states (refs and reactives)
const upload = useTemplateRef('uploadRef');
const files = ref<CustomFile[]>([]);
const errorList = ref<FileErrorMessage[]>([]);
const uploadQueueStatus = ref<QueueStatus>({
  total: 0,
  waiting: 0,
  completed: 0,
  failed: 0,
});
const uploadQueue = new UploadQueue({ maxConcurrentUploads: props.maxConcurrentUploads, emit: () => emit('onUpload', files.value), onProgress: status => (uploadQueueStatus.value = status) });
// computed
const actionButtons = computed(() => {
  const commonButtonProps = {
    variant: 'outline',
    size: 'sm',
    rounded: 'full',
    iconOnly: true,
  };
  const commonSvgProps = {
    size: '1.1rem',
  };
  const actions = [
    {
      id: 'upload',
      buttonProps: {
        ...commonButtonProps,
        color: 'secondary',
        disabled: props.disabled,
      },
      svgProps: {
        ...commonSvgProps,
        src: diveFolderUploadOutlineIcon,
      },
    },
    {
      id: 'push',
      buttonProps: {
        ...commonButtonProps,
        color: 'success',
        disabled: files.value.length === 0,
        style: {
          opacity: files.value.length === 0 ? 0.3 : 1,
        },
      },
      svgProps: {
        ...commonSvgProps,
        src: cloudUploadOutlineIcon,
      },
    },
    {
      id: 'clear',
      buttonProps: {
        ...commonButtonProps,
        color: 'danger',
        disabled: Boolean(files.value.length === 0 && errorList.value.length === 0),
        style: {
          opacity: files.value.length === 0 && errorList.value.length === 0 ? 0.3 : 1,
        },
      },
      svgProps: {
        ...commonSvgProps,
        src: closeIcon,
      },
    },
  ] as { id: string; buttonProps: ButtonProps; svgProps: SvgProps }[];

  if (!props.uploader) {
    actions.splice(1, 1);
  }

  return actions;
});
// watchers

// lifecycles
onBeforeUnmount(() => {
  uploadQueue.abortAll();
});
// methods
function handleFileUpload(uploadedFiles: CustomFile[]) {
  const tmpFiles = [...files.value, ...uploadedFiles];
  tmpFiles.sort((a, b) => b.uploadedDate - a.uploadedDate);
  files.value = tmpFiles;
  files.value.forEach(file => {
    uploadQueue.addToQueue(file);
  });
}
function handleFileDelete(file: CustomFile) {
  files.value = files.value.filter(f => f.id !== file.id);
}
function handleUploadClick() {
  if (upload.value) {
    upload.value.onClick();
  }
}
function handleClear() {
  files.value = [];
  errorList.value = [];
  uploadQueueStatus.value = {
    total: 0,
    waiting: 0,
    completed: 0,
    failed: 0,
  };
  uploadQueue.abortAll();
}
function handleError(errors: FileErrorMessage[]) {
  if (!props.showErrorMessages) return;
  errorList.value = errors;
}
function handleActionClick(actionId: string) {
  if (actionId === 'upload') {
    handleUploadClick();
  } else if (actionId === 'push') {
    props.uploader?.(files.value.map(f => f.raw));
  } else if (actionId === 'clear') {
    handleClear();
  }
}
</script>

<style lang="scss" scoped src="./FileUpload.style.scss"></style>
