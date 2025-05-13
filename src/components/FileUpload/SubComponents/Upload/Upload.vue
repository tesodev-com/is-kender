<template>
  <div
    ref="uploadContainerRef"
    class="upload"
    :class="{ 'upload--disabled': props.disabled, 'upload--drag-active': isDragActive }"
    @click="handleClick"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div
      v-if="props.loading"
      class="upload__loading"
    >
      <Spinner
        class="upload__spinner"
        size="1.5rem"
      ></Spinner>
    </div>
    <input
      ref="uploadInputRef"
      type="file"
      class="upload__input"
      :disabled="disabled || loading"
      :multiple="multiple"
      :accept="accept"
      @change="handleUpload"
    />
    <Button
      color="secondary"
      variant="outline"
      iconOnly
      class="upload__button"
    >
      <Svg
        :src="cloudUploadOutlineIcon"
        size="1.25rem"
      ></Svg>
    </Button>
    <div class="upload__content">
      <div class="upload__actions">
        <span class="upload__primary-text">Yüklemek için tıkla&#32;</span>
        <span class="upload__secondary-text">veya sürükleyip bırak</span>
      </div>
      <span class="upload__description">{{ descriptionText }}</span>
      <div
        v-if="uploadQueueStatus.total"
        class="upload__status"
      >
        <span
          v-for="status in uploadStatusList"
          :key="status.class"
          class="upload__status-text"
          :class="`upload__status-text--${status.class}`"
        >
          <Svg
            size="1.25rem"
            :src="status.icon"
          ></Svg>
          <strong>{{ status.label }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { cancelIconRoundedOutline, checkIconRoundedOutline, cloudUploadOutlineIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Spinner from 'library-components/Spinner';
import Svg from 'library-components/Svg';
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
import type { CustomFile } from '../../types';
import Utils, { type QueueStatus } from '../../utils';
import { getErrorMessage } from './constants';
import type { FileErrorMessage, UploadEmits, UploadProps } from './types';
// interfaces & types

// constants

// composable

// props
const props = defineProps<UploadProps>();
// defineEmits
const emit = defineEmits<UploadEmits>();
// states (refs and reactives)
const errorList = ref<FileErrorMessage[]>([]);
const uploadContainer = useTemplateRef('uploadContainerRef');
const uploadInput = useTemplateRef('uploadInputRef');
const isDragActive = ref(false);
const uploadQueueStatus = ref<QueueStatus>({
  total: 0,
  completed: 0,
  waiting: 0,
  failed: 0,
});
// computed
const descriptionText = computed(() => {
  return props.description || `${props.accept} ${props.maxSize ? ` (max. ${Utils.formatFileSize(props.maxSize)})` : ''}`;
});
const uploadStatusList = computed(() => {
  return [
    {
      class: 'uploading',
      icon: cloudUploadOutlineIcon,
      label: uploadQueueStatus.value.waiting,
    },
    {
      class: 'failed',
      icon: cancelIconRoundedOutline,
      label: uploadQueueStatus.value.failed,
    },
    {
      class: 'completed',
      icon: checkIconRoundedOutline,
      label: uploadQueueStatus.value.completed,
    },
  ];
});
// watchers
watch(
  () => props.uploadQueueStatus,
  () => {
    if (props.uploadQueueStatus) {
      uploadQueueStatus.value = props.uploadQueueStatus;
    }
  },
  { deep: true }
);
// lifecycles
onMounted(() => {
  if (uploadContainer.value) {
    uploadContainer.value.addEventListener('dragenter', preventDefault);
    uploadContainer.value.addEventListener('dragover', preventDefault);
    uploadContainer.value.addEventListener('dragleave', preventDefault);
    uploadContainer.value.addEventListener('drop', preventDefault);
  }
});
onBeforeUnmount(() => {
  if (uploadContainer.value) {
    uploadContainer.value.removeEventListener('dragenter', preventDefault);
    uploadContainer.value.removeEventListener('dragover', preventDefault);
    uploadContainer.value.removeEventListener('dragleave', preventDefault);
    uploadContainer.value.removeEventListener('drop', preventDefault);
  }
});
// methods
function handleClick() {
  if (uploadInput.value) {
    uploadInput.value.click();
  }
}
function handleUpload(event: Event | DragEvent) {
  const files = getFiles(event);
  emit('onUpload', files);
  emit('onError', errorList.value || []);
  if (uploadInput.value) {
    uploadInput.value.value = '';
    errorList.value = [];
  }
}
function handleDragEnter() {
  if (props.disabled || props.loading) return;
  isDragActive.value = true;
}
function handleDragLeave() {
  if (props.disabled || props.loading) return;
  isDragActive.value = false;
}
function handleDrop(event: DragEvent) {
  if (props.disabled || props.loading) return;
  isDragActive.value = false;
  handleUpload(event);
}
function getFiles(event: Event | DragEvent) {
  let files: FileList | null = null;
  if (event instanceof DragEvent) {
    files = event.dataTransfer?.files || null;
  } else if (event instanceof Event) {
    const target = event.target as HTMLInputElement;
    files = target.files || null;
  }
  let uploadedFiles = Array.from(files || []);
  if (!uploadedFiles.length || (props.maxFiles && uploadedFiles.length > props.maxFiles)) {
    errorList.value?.push({ message: getErrorMessage('FILE_COUNT', { count: props.maxFiles ?? 0 }) });
    return [];
  }
  if (props.accept) {
    uploadedFiles = uploadedFiles.filter(validateFile);
  }
  uploadedFiles = uploadedFiles
    .map(file => {
      const isValid = validateFile(file);
      if (isValid) {
        return {
          id: Math.random().toString(36).substring(2, 9),
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
          uploadedDate: new Date().getTime(),
          raw: file,
        };
      }
    })
    .filter(Boolean) as CustomFile[];
  return uploadedFiles as CustomFile[];
}
function validateFile(file: File) {
  return [validateType(file), validateSize(file)].every(Boolean);
}
function validateType(file: File) {
  const acceptTypes = (props.accept || '').split(',').map(type => type.trim());
  return acceptTypes.some(acceptType => {
    const regex = new RegExp(acceptType.replace(/\*/g, '.*'));
    const result = regex.test(file.type);
    if (!result) {
      errorList.value?.push({ file, message: getErrorMessage('FILE_TYPE', { name: file.name, type: acceptTypes.join(', ') }) });
    }
    return result;
  });
}
function validateSize(file: File) {
  if (props.maxSize) {
    const result = file.size <= props.maxSize;
    if (!result) {
      errorList.value?.push({ file, message: getErrorMessage('FILE_SIZE', { name: file.name, size: Utils.formatFileSize(props.maxSize) }) });
    }
    return result;
  }
  return true;
}
function preventDefault(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
}
function clearErrorList() {
  errorList.value = [];
  emit('onError', errorList.value);
}
defineExpose({
  onClick: handleClick,
  clearErrorList,
});
</script>

<style lang="scss" scoped src="./Upload.style.scss"></style>
