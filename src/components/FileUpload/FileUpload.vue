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
        :disabled="files.length === 0"
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
      @on-upload="onUpload"
    />
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
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { ref, useTemplateRef } from 'vue';
import { File, Upload } from './SubComponents';
import type { CustomFile, FileUploadEvents, FileUploadProps } from './types';
// interfaces & types

// constants

// composable

// props
withDefaults(defineProps<FileUploadProps>(), {
  disabled: false,
  multiple: true,
  preview: true,
  template: 'col',
});
// defineEmits
const emit = defineEmits<FileUploadEvents>();
// states (refs and reactives)
const files = ref<CustomFile[]>([]);
const uploadRef = useTemplateRef('uploadRef');
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
}
</script>

<style lang="scss" scoped src="./FileUpload.style.scss"></style>
