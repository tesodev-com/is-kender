<template>
  <div :class="getFileClasses">
    <img
      v-if="preview && file.preview"
      :src="file.preview"
      alt="File Preview"
      class="file-preview"
    />
    <Svg
      v-else
      :name="fileIcon"
      :size="template === 'row' ? '5rem' : '2.5rem'"
      class="file-preview"
      preserveColor
    ></Svg>
    <div class="file-information">
      <div
        class="file-name"
        :title="file.name"
      >
        {{ file.name }}
      </div>
      <div class="file-specs">
        <span class="file-specs-size">{{ formatFileSize(fileReadStatus.loadedSize) }} of {{ formatFileSize(file.raw.size) }}</span>
        <Divider layout="vertical" />
        <div class="file-specs-status">
          <Svg
            class="file-status-icon"
            size="1.15rem"
            :src="uploadState.icon"
          ></Svg>
          <span class="file-status-text">{{ uploadState.label }}</span>
        </div>
      </div>
      <ProgressBar
        v-if="['uploading', 'completed'].includes(fileReadStatus.loadingState)"
        :maxValue="100"
        :value="fileReadStatus.percent"
        showPercentage
      />
      <Button
        v-else
        color="danger"
        variant="ghost"
        class="try-again-button"
        @click="onTryAgain"
      >
        Yeniden dene
      </Button>
      <Svg
        class="file-delete-icon"
        size="1.5rem"
        :src="deleteForeverOutlineIcon"
        @click="onDelete"
      ></Svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { cancelIconRoundedOutline, checkIconRoundedOutline, cloudUploadOutlineIcon, deleteForeverOutlineIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Divider from 'library-components/Divider';
import ProgressBar from 'library-components/ProgressBar';
import Svg from 'library-components/Svg';
import { computed, onMounted, ref } from 'vue';
import type { ReadProgress } from '../../types';
import type { FileEmits, FileProps } from './types';
// interfaces & types

// constants
const uploadStates: Record<ReadProgress['loadingState'], { class: string; icon: any; label: string }> = {
  uploading: {
    class: 'uploading',
    icon: cloudUploadOutlineIcon,
    label: 'Yükleniyor',
  },
  completed: {
    class: 'completed',
    icon: checkIconRoundedOutline,
    label: 'Tamamlandı',
  },
  failed: {
    class: 'failed',
    icon: cancelIconRoundedOutline,
    label: 'Başarısız',
  },
};
const fileIconMap: { [key: string]: string } = {
  image: 'image',
  video: 'video',
  audio: 'audio',
  pdf: 'pdf',
  spreadsheet: 'spreadsheet',
  document: 'document',
  code: 'code',
  folder: 'folder',
  empty: 'empty',
  tick: 'tick',
  loading: 'loading',
  default: 'empty',
};
// composable

// props
const props = defineProps<FileProps>();
// defineEmits
const emit = defineEmits<FileEmits>();
// states (refs and reactives)
const fileReadStatus = ref<ReadProgress>({ percent: 0, loadedSize: 0, loadingState: 'uploading' });
// computed
const uploadState = computed(() => {
  return uploadStates[fileReadStatus.value.loadingState];
});
const fileIcon = computed(() => {
  const mime = props.file.raw.type;
  if (!mime) return fileIconMap.empty;

  if (mime.startsWith('image/')) return fileIconMap.image;
  if (mime.startsWith('video/')) return fileIconMap.video;
  if (mime.startsWith('audio/')) return fileIconMap.audio;

  if (mime === 'application/pdf') return fileIconMap.pdf;
  if (mime === 'application/vnd.ms-excel' || mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return fileIconMap.spreadsheet;

  if (mime === 'application/msword' || mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return fileIconMap.document;

  if (mime === 'application/javascript' || mime === 'application/json' || mime.startsWith('text/')) return fileIconMap.code;

  return fileIconMap.default;
});
const getFileClasses = computed(() => {
  return ['file', `file-${props.template}`, uploadState.value.class];
});
// watchers

// lifecycles
onMounted(() => {
  props.file.readFile(onReadFile);
});
// methods
function onReadFile(state: ReadProgress) {
  fileReadStatus.value = state;
}
function onTryAgain() {
  props.file.readFile(onReadFile);
}
function onDelete() {
  emit('onDelete', props.file);
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

<style lang="scss" scoped src="./File.style.scss"></style>
