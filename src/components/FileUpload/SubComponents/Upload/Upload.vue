<template>
  <div
    ref="uploadContainerRef"
    class="upload-container"
    :class="{ 'upload-disabled': props.disabled }"
    @click="onClick"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <input
      ref="uploadInputRef"
      type="file"
      class="upload-input"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="onUpload"
    />
    <Button
      color="secondary"
      variant="outline"
      iconOnly
      class="upload-button"
    >
      <Svg
        :src="cloudUploadOutlineIcon"
        size="1.25rem"
      ></Svg>
    </Button>
    <div class="message-container">
      <div class="actions">
        <span class="bold-message">Click to upload</span>
        or drag and drop
      </div>
      <span class="description">SVG, PNG, JPG or GIF (max. 800x400px)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { cloudUploadOutlineIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import type { CustomFile, ReadProgress } from '../../types';
import type { UploadEmits, UploadProps } from './types';
// interfaces & types

// constants

// composable

// props
const props = defineProps<UploadProps>();
// defineEmits
const emit = defineEmits<UploadEmits>();
// states (refs and reactives)
const uploadContainerRef = useTemplateRef('uploadContainerRef');
const uploadInputRef = useTemplateRef('uploadInputRef');
// computed

// watchers

// lifecycles
onMounted(() => {
  if (uploadContainerRef.value) {
    uploadContainerRef.value.addEventListener('dragenter', preventDefault);
    uploadContainerRef.value.addEventListener('dragover', preventDefault);
    uploadContainerRef.value.addEventListener('dragleave', preventDefault);
    uploadContainerRef.value.addEventListener('drop', preventDefault);
  }
});
onBeforeUnmount(() => {
  if (uploadContainerRef.value) {
    uploadContainerRef.value.removeEventListener('dragenter', preventDefault);
    uploadContainerRef.value.removeEventListener('dragover', preventDefault);
    uploadContainerRef.value.removeEventListener('dragleave', preventDefault);
    uploadContainerRef.value.removeEventListener('drop', preventDefault);
  }
});
// methods
function onClick() {
  if (uploadInputRef.value) {
    uploadInputRef.value.click();
  }
}
function onUpload(event: Event | DragEvent) {
  const files = getFiles(event);
  emit('onUpload', files);
  if (uploadInputRef.value) {
    uploadInputRef.value.value = '';
  }
}
function onDragEnter() {
  if (props.disabled) return;
  if (uploadContainerRef.value) {
    uploadContainerRef.value.classList.add('drag-enter');
  }
}
function onDragLeave() {
  if (props.disabled) return;
  if (uploadContainerRef.value) {
    uploadContainerRef.value.classList.remove('drag-enter');
  }
}
function onDrop(event: DragEvent) {
  if (props.disabled) return;
  if (uploadContainerRef.value) {
    uploadContainerRef.value.classList.remove('drag-enter');
  }
  onUpload(event);
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
  if (props.accept) {
    uploadedFiles = uploadedFiles.filter(validateFile);
  }
  uploadedFiles = uploadedFiles.map(file => {
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      raw: file,
      lastModified: file.lastModified,
      isImage: file.type.startsWith('image/'),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
      uploadedDate: new Date().getTime(),
      readFile: onProgress => readFile(file, onProgress),
      isReady: false,
    };
  }) as CustomFile[];
  return uploadedFiles as CustomFile[];
}
function validateFile(file: File) {
  const acceptTypes = (props.accept || '').split(',').map(type => type.trim());
  return acceptTypes.some(acceptType => {
    const regex = new RegExp(acceptType.replace(/\*/g, '.*'));
    return regex.test(file.type);
  });
}
async function readFile(file: File, onProgress: (state: ReadProgress) => void) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onprogress = e => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress({ percent, loadedSize: e.loaded, loadingState: 'uploading' });
      }
    };

    reader.onload = () => {
      onProgress({
        percent: 100,
        loadedSize: file.size,
        loadingState: 'completed',
      });
      resolve(reader.result);
    };

    reader.onerror = e => {
      onProgress({
        percent: 0,
        loadedSize: 0,
        loadingState: 'failed',
      });
      reject(e);
    };

    reader.readAsDataURL(file);
  });
}
function preventDefault(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
}
</script>

<style lang="scss" scoped src="./Upload.style.scss"></style>
