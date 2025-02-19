<template>
  <div class="file-upload-wrapper">
    <div class="file-upload-actions">
      <input
        ref="fileUploadInput"
        type="file"
        class="file-upload-input"
        v-bind="fileInputProps"
        @change="handleFileChange"
      >
      <button
        class="file-upload-button file-upload-button-dark"
        type="button"
        :disabled="disabled"
        @click="handleChooseFile">
        Choose
      </button>
      <button
        v-if="uploader"
        class="file-upload-button file-upload-button-secondary"
        type="button"
        :disabled="!fileList?.length || !!errorList.length"
        @click="handleUploadFile"
      >
        Upload
      </button>
      <button
        class="file-upload-button file-upload-button-secondary"
        type="button"
        :disabled="!fileList?.length"
        @click="handleCancel">
        Cancel
      </button>
    </div>
    <div class="file-upload-content">
      <ul v-if="errorList?.length" class="file-upload-error-list">
        <li v-for="(error, index) in errorList" :key="index" class="file-upload-error-list-item">
          <p>{{ error.file?.name }}: {{ error.message }}</p>
        </li>
      </ul>
      <div
        class="file-upload-file-list"
        :class="[{ 'drag': isDragging }]"
        @dragover="handleDrag"
        @dragleave="handleDrag"
        @drop="handleDropFile">
        <slot v-if="!fileList?.length" name="empty">
          <span class="file-upload-empty">
            Drag and drop to here to upload
          </span>
        </slot>
        <div
          v-for="(file, index) in fileList"
          :key="index"
          class="file-upload-file-list-item"
        >
          <slot name="file" :file="file" :index="index">
            <img v-if="file.isImage && file.preview" :src="file.preview" class="preview">
            <span class="name">{{ file.name }}</span>
            <span class="size">{{ formatFileSize(file.size) }}</span>
            <span class="delete" @click="handleDeleteFile(index)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"><path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L6 18M6 6l12 12"/></svg>
            </span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
interface CustomFile {
    name: string;
    size: number;
    type: string;
    isImage: boolean;
    preview: string | null;
    raw: File;
}
interface FileErrorMessage {
    file?: CustomFile;
    message: string;
}
interface FileUploadProps {
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    sizeErrorMessage?: string;
    acceptErrorMessage?: string;
    uploader?: (file: File[]) => Promise<boolean>;
}
interface FileUploadSlots {
    file: {
        file: CustomFile;
        index: number;
    };
    empty: string;
}
interface FileUploadEvents {
    (e: 'upload', file: File[]): void;
}
const props = withDefaults(defineProps<FileUploadProps>(), {
  sizeErrorMessage: 'File size exceeds the limit of $value bytes',
  acceptErrorMessage: 'File type is not allowed, only $value is allowed'
});
const emit = defineEmits<FileUploadEvents>();
defineSlots<FileUploadSlots>();
const rawFileList = computed(() => fileList.value.map((file) => file.raw));
const errorMessageObj = {
  FILE_SIZE_EXCEED_WITH_SIZE: props.sizeErrorMessage,
  FILE_TYPE_NOT_ALLOWED_WITH_ACCEPT: props.acceptErrorMessage,
  FILE_UPLOAD_FAILED: 'File upload failed',
};
const fileUploadInput = ref<HTMLInputElement | null>(null);
const fileList = ref<CustomFile[]>([]);
const errorList = ref<FileErrorMessage[]>([]);
const isDragging = ref(false);
const fileInputProps = computed(() => {
  return {
    disabled: props.disabled,
    multiple: props.multiple,
    accept: props.accept,
  };
});
function handleChooseFile() {
  fileUploadInput.value?.click();
}
function handleDropFile(event: DragEvent) {
  event?.preventDefault();
  isDragging.value = false;
  handleFileChange(event);
}
function handleFileChange<T = Event | DragEvent>(event: T) {
  let files: FileList | null = null;

  if (event instanceof DragEvent) {
    files = event.dataTransfer?.files || null;
  } else if (event instanceof Event) {
    files = (event.target as HTMLInputElement).files || null;
  }

  if (files) {
    const tmpFileList = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      isImage: file.type.includes('image'),
      preview: file.type.includes('image') ? URL.createObjectURL(file) : null,
      raw: file,
    })) as CustomFile[];

    const validatedFileList = validateFileList(tmpFileList);

    if (props.multiple) {
      fileList.value = [...fileList.value, ...validatedFileList];
    } else {
      fileList.value = validatedFileList;
    }
    emit('upload', rawFileList.value);
  }
}
function handleCancel() {
  if (fileUploadInput.value) {
    fileUploadInput.value.value = '';
  }
  fileList.value = [];
  errorList.value = [];
}
function handleDeleteFile(index: number) {
  fileList.value.splice(index, 1);
}
async function handleUploadFile() {
  if (props.uploader) {
    try {
      const result = await props.uploader(rawFileList.value);
      if (result) {
        fileList.value = [];
        errorList.value = [];
      }
    } catch {
      createError({ message: errorMessageObj.FILE_UPLOAD_FAILED });
    }
  }
}
function validateFileList(fileList: CustomFile[]) {
  errorList.value = [];
  return fileList.map((file) => {
    const isValid = [validateFileSize(file), validateFileAccept(file)].every(value => value);
    if (isValid) return file;
  }).filter(Boolean) as CustomFile[];
}
function validateFileSize(file: CustomFile) {
  if (!props.maxSize) return true;
  const isValid = file.size < props.maxSize;
  if (!isValid) {
    createError({ file, message: errorMessageObj.FILE_SIZE_EXCEED_WITH_SIZE, value: props.maxSize.toString() });
  }
  return isValid;
}
function validateFileAccept(file: CustomFile) {
  if (!props.accept) return true;
  const acceptedTypes = props.accept.split(',').map((type) => type.trim());
  const isValid = acceptedTypes.some((type) => file.type.includes(type));
  if (!isValid) {
    createError({ file, message: errorMessageObj.FILE_TYPE_NOT_ALLOWED_WITH_ACCEPT, value: props.accept });
  }
  return isValid;
}
function handleDrag(event: DragEvent) {
  event?.preventDefault();
  isDragging.value = event.type === 'dragover';
}
function createError({ file, message, value = '' }: { file?: CustomFile; message: string, value?: string }) {
  errorList.value.push({
    file,
    message: message.replace('$value', value),
  });
}
function formatFileSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
</script>

<style lang="scss" scoped src="./FileUpload.style.scss"></style>