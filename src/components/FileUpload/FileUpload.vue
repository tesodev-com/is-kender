<template>
  <div class="file-upload-container">
    <Upload
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @on-upload="onUpload"
    />
    <transition-group name="list">
      <File
        v-for="file in files"
        :key="file.id"
        :file="file"
        @on-delete="onDelete"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
// imports
import { ref } from 'vue';
import { File, Upload } from './SubComponents';
import type { CustomFile, FileUploadProps } from './types';
// interfaces & types

// constants

// composable

// props
defineProps<FileUploadProps>();
// defineEmits

// states (refs and reactives)
const files = ref<CustomFile[]>([]);
// computed

// watchers

// lifecycles

// methods
function onUpload(uploadedFiles: CustomFile[]) {
  const tmpFiles = [...files.value, ...uploadedFiles];
  tmpFiles.sort((a, b) => b.uploadedDate - a.uploadedDate);
  files.value = tmpFiles;
}
function onDelete(file: CustomFile) {
  files.value = files.value.filter(f => f.id !== file.id);
}
</script>

<style lang="scss" scoped src="./FileUpload.style.scss"></style>
