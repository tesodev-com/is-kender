<template>
  <div class="file-upload-container">
    <div class="file-upload-actions">
      <Button
        color="secondary"
        variant="outline"
        size="sm"
        rounded="full"
        iconOnly
        @click="onUploadClick"
      >
        <Svg
          size="1.1rem"
          :src="diveFolderUploadOutlineIcon"
        ></Svg>
      </Button>
      <Button
        v-if="uploader"
        color="success"
        variant="outline"
        size="sm"
        rounded="full"
        iconOnly
        :disabled="files.length === 0"
      >
        <Svg
          size="1.1rem"
          :src="cloudUploadOutlineIcon"
        ></Svg>
      </Button>
      <Button
        color="danger"
        variant="outline"
        size="sm"
        rounded="full"
        iconOnly
        :disabled="files.length === 0 && errorList.length === 0"
        @click="onClear"
      >
        <Svg
          size="1.1rem"
          :src="closeIcon"
        ></Svg>
      </Button>
    </div>
    <Upload
      ref="uploadRef"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :maxFiles="maxFiles"
      :maxSize="maxSize"
      @on-error="onError"
      @on-upload="onUpload"
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
      v-if="files.length"
      class="file-list"
      :class="[`file-list-${template}`]"
    >
      <File
        v-for="file in files"
        :key="file.id"
        :file="file"
        :template="template"
        :preview="preview"
        @on-delete="onDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { closeIcon, cloudUploadOutlineIcon, diveFolderUploadOutlineIcon } from '@/assets/icons';
import Alert from 'library-components/Alert';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { ref, useTemplateRef } from 'vue';
import { File, Upload, type FileErrorMessage } from './SubComponents';
import type { CustomFile, FileUploadEvents, FileUploadProps } from './types';
// interfaces & types

// constants

// composable

// props
withDefaults(defineProps<FileUploadProps>(), {
  disabled: false,
  multiple: true,
  preview: true,
  maxSize: 1024 * 1024,
  accept: 'image',
  template: 'row',
});
// defineEmits
const emit = defineEmits<FileUploadEvents>();
// states (refs and reactives)
const uploadRef = useTemplateRef('uploadRef');
const files = ref<CustomFile[]>([]);
const errorList = ref<FileErrorMessage[]>([]);
// computed

// watchers

// lifecycles

// methods
function onUpload(uploadedFiles: CustomFile[]) {
  const tmpFiles = [...files.value, ...uploadedFiles];
  tmpFiles.sort((a, b) => b.uploadedDate - a.uploadedDate);
  files.value = tmpFiles;
  emit('onUpload', files.value);
}
function onDelete(file: CustomFile) {
  files.value = files.value.filter(f => f.id !== file.id);
}
function onUploadClick() {
  if (uploadRef.value) {
    uploadRef.value.onClick();
  }
}
function onClear() {
  files.value = [];
  uploadRef.value?.clearErrorList();
}
function onError(errors: FileErrorMessage[]) {
  errorList.value = errors;
}
</script>

<style lang="scss" scoped src="./FileUpload.style.scss"></style>
