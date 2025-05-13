<template>
  <div :class="containerClasses">
    <img
      v-if="preview && file.preview"
      :src="file.preview"
      alt="File Preview"
      class="file-item__preview-image"
    />
    <Svg
      v-else
      :name="fileTypeIcon"
      :size="template === 'row' ? '5rem' : '2.5rem'"
      class="file-item__preview-icon"
      preserveColor
    ></Svg>
    <div class="file-item__content">
      <div
        class="file-item__name"
        :title="file.name"
      >
        {{ file.name }}
      </div>
      <div class="file-item__meta">
        <span class="file-item__size">{{ Utils.formatFileSize(fileReadStatus.loadedSize) }} of {{ Utils.formatFileSize(file.raw.size) }}</span>
        <Divider layout="vertical" />
        <div class="file-item__status">
          <Svg
            class="file-item__status-icon"
            size="1.15rem"
            :src="uploadState.icon"
          ></Svg>
          <span class="file-item__status-text">{{ uploadState.label }}</span>
        </div>
      </div>
      <ProgressBar
        v-if="['uploading', 'completed'].includes(fileReadStatus.loadingState)"
        :maxValue="100"
        :value="fileReadStatus.percent"
        showPercentage
        class="file-item__progress"
      />
      <div class="file-item__actions">
        <Svg
          class="file-item__action"
          size="1.5rem"
          :src="cropIcon"
          @click="handleEdit"
        ></Svg>
        <Svg
          class="file-item__action"
          size="1.5rem"
          :src="deleteForeverOutlineIcon"
          @click="handleDelete"
        ></Svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { cancelIconRoundedOutline, checkIconRoundedOutline, cloudUploadOutlineIcon, cropIcon, deleteForeverOutlineIcon } from '@/assets/icons';
import Divider from 'library-components/Divider';
import ProgressBar from 'library-components/ProgressBar';
import Svg from 'library-components/Svg';
import { computed, onUnmounted, ref, watch } from 'vue';
import type { ReadProgress } from '../../types';
import Utils from '../../utils';
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
const fileTypeIcon = computed(() => {
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
const containerClasses = computed(() => {
  return ['file-item', `file-item--${props.template}`, `file-item--${uploadState.value.class}`];
});
// watchers
watch(
  () => props.file.status,
  status => {
    fileReadStatus.value = status;
  }
);
// lifecycles
onUnmounted(() => {
  if (props.file.preview) URL.revokeObjectURL(props.file.preview);
});
// methods
function handleDelete() {
  emit('onDelete', props.file);
}
function handleEdit() {
  emit('onEdit', props.file);
}
</script>

<style lang="scss" scoped src="./File.style.scss"></style>
