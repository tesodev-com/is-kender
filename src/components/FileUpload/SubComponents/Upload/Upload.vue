<template>
  <div
    ref="uploadContainerRef"
    class="file-uploader"
    :class="{ 'file-uploader--disabled': props.disabled, 'file-uploader--drag-active': isDragActive }"
    @click="onClick"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <input
      ref="uploadInputRef"
      type="file"
      class="file-uploader__input"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="onUpload"
    />
    <Button
      color="secondary"
      variant="outline"
      iconOnly
      class="file-uploader__button"
    >
      <Svg
        :src="cloudUploadOutlineIcon"
        size="1.25rem"
      ></Svg>
    </Button>
    <div class="file-uploader__content">
      <div class="file-uploader__actions">
        <span class="file-uploader__primary-text">Yüklemek için tıkla</span>
        <span class="file-uploader__secondary-text">veya sürükleyip bırak</span>
      </div>
      <span class="file-uploader__description">{{ getDescription }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { cloudUploadOutlineIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import type { CustomFile, ReadProgress } from '../../types';
import Utils from '../../utils';
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
const uploadContainerRef = useTemplateRef('uploadContainerRef');
const uploadInputRef = useTemplateRef('uploadInputRef');
const isDragActive = ref(false);
// computed
const getDescription = computed(() => {
  return props.description || `${props.accept} ${props.maxSize ? ` (max. ${Utils.formatFileSize(props.maxSize)})` : ''}`;
});
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
  emit('onError', errorList.value || []);
  if (uploadInputRef.value) {
    uploadInputRef.value.value = '';
    errorList.value = [];
  }
}
function onDragEnter() {
  if (props.disabled) return;
  isDragActive.value = true;
}
function onDragLeave() {
  if (props.disabled) return;
  isDragActive.value = false;
}
function onDrop(event: DragEvent) {
  if (props.disabled) return;
  isDragActive.value = false;
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
          name: file.name,
          size: file.size,
          type: file.type,
          raw: file,
          lastModified: file.lastModified,
          isImage: file.type.startsWith('image/'),
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
          uploadedDate: new Date().getTime(),
          readFile: (onProgress: (state: ReadProgress) => void) => readFile(file, onProgress),
          isReady: false,
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
function clearErrorList() {
  errorList.value = [];
  emit('onError', errorList.value);
}
defineExpose({
  onClick,
  clearErrorList,
});
</script>

<style lang="scss" scoped src="./Upload.style.scss"></style>
