<template>
  <div class="image-cropper">
    <!-- Preview Section -->
    <div
      ref="imagePreview"
      class="image-cropper__preview"
    >
      <img
        :src="getImage"
        alt="Crop Preview"
        class="image-cropper__image"
        :style="getImageStyles"
        draggable="false"
      />
      <div
        ref="cropFrame"
        class="image-cropper__crop-frame"
        :style="getCropStyles"
        @mousedown="startDragging"
      ></div>
    </div>

    <!-- Kontroller Section -->
    <div class="image-cropper__controls">
      <div
        v-for="(group, index) in actionList"
        :key="index"
        class="image-cropper__control-group"
      >
        <label class="image-cropper__control-label">
          {{ group.label }}
        </label>
        <div class="image-cropper__controls">
          <Button
            v-for="control in group.controls"
            :key="control.id"
            v-bind="control"
            color="primary"
            variant="solid"
            iconOnly
            @click="onClickAction(control.id)"
          >
            <Svg
              size="1.5rem"
              :src="control.icon"
              :class="{ 'flip-vertical': control.id === 'flipVertical' }"
            ></Svg>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { circleIcon, flipIcon, refreshIcon, rotateLeftIcon, rotateRightIcon, squareIcon, zoomInIcon, zoomOutIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
// interfaces & types
interface CropState {
  shape: 'circle' | 'square';
  top: number | string;
  left: number | string;
  width: number | string;
  height: number | string;
}
interface ImageCropperProps {
  image: string | File;
}
// constants
const actionList = [
  {
    label: 'Rotation',
    controls: [
      {
        id: 'rotateLeft',
        icon: rotateLeftIcon,
      },
      {
        id: 'rotateRight',
        icon: rotateRightIcon,
      },
    ],
  },
  {
    label: 'Flip',
    controls: [
      {
        id: 'flipHorizontal',
        icon: flipIcon,
      },
      {
        id: 'flipVertical',
        icon: flipIcon,
      },
    ],
  },
  {
    label: 'Zoom',
    controls: [
      {
        id: 'zoomIn',
        icon: zoomInIcon,
      },
      {
        id: 'zoomOut',
        icon: zoomOutIcon,
      },
    ],
  },
  {
    label: 'Şablon',
    controls: [
      {
        id: 'circle',
        icon: circleIcon,
      },
      {
        id: 'square',
        icon: squareIcon,
      },
    ],
  },
  {
    label: 'İşlemler',
    controls: [
      {
        id: 'reset',
        icon: refreshIcon,
      },
    ],
  },
] as const;
// composable

// props
const props = defineProps<ImageCropperProps>();
// defineEmits

// states (refs and reactives)
const previewRef = useTemplateRef('imagePreview');
const frameRef = useTemplateRef('cropFrame');
const isDragging = ref(false);
const imageState = ref({
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
});
const cropState = ref<CropState>({
  shape: 'circle',
  top: '50%',
  left: '50%',
  width: '100px',
  height: '100px',
});
const dragOffset = ref({ x: 0, y: 0 });
// computed
const getImage = computed(() => {
  if (!props.image) {
    return new URL('../../assets/icons/empty.svg', import.meta.url).href;
  }
  if (props.image instanceof File) {
    return URL.createObjectURL(props.image);
  }
  return props.image;
});
const getImageStyles = computed(() => {
  return {
    transform: `rotate(${imageState.value.rotate}deg) scaleX(${imageState.value.scaleX}) scaleY(${imageState.value.scaleY})`,
  };
});
const getCropStyles = computed(() => {
  return {
    top: cropState.value.top,
    left: cropState.value.left,
    width: cropState.value.width,
    height: cropState.value.height,
    borderRadius: cropState.value.shape === 'circle' ? '50%' : '0',
  };
});
// watchers

// lifecycles
onMounted(() => {
  window.addEventListener('mousemove', moveCropFrame);
  window.addEventListener('mouseup', stopDragging);
  setInitialCropFrameState();
});
onUnmounted(() => {
  window.removeEventListener('mousemove', moveCropFrame);
  window.removeEventListener('mouseup', stopDragging);
});
// methods
function startDragging(event: MouseEvent) {
  if (!frameRef.value) return;

  isDragging.value = true;
  const rect = frameRef.value.getBoundingClientRect();

  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
function moveCropFrame(event: MouseEvent) {
  if (!isDragging.value || !previewRef.value || !frameRef.value) return;

  const previewRect = previewRef.value.getBoundingClientRect();

  let left = event.clientX - previewRect.left - dragOffset.value.x;
  let top = event.clientY - previewRect.top - dragOffset.value.y;

  cropState.value.left = `${left}px`;
  cropState.value.top = `${top}px`;
}
function stopDragging() {
  isDragging.value = false;
}
function onClickAction(action: (typeof actionList)[number]['controls'][number]['id']) {
  switch (action) {
    case 'rotateLeft':
      rotateLeft();
      break;
    case 'rotateRight':
      rotateRight();
      break;
    case 'flipHorizontal':
      flipHorizontal();
      break;
    case 'flipVertical':
      flipVertical();
      break;
    case 'zoomIn':
      zoomIn();
      break;
    case 'zoomOut':
      zoomOut();
      break;
    case 'circle':
      updateShape('circle');
      break;
    case 'square':
      updateShape('square');
      break;
    case 'reset':
      setInitialImageState();
      setInitialCropFrameState();
      break;
    default:
      break;
  }
}
function rotateLeft() {
  imageState.value.rotate -= 90;
}
function rotateRight() {
  imageState.value.rotate += 90;
}
function flipHorizontal() {
  imageState.value.scaleX *= -1;
}
function flipVertical() {
  imageState.value.scaleY *= -1;
}
function updateShape(shape: CropState['shape']) {
  cropState.value.shape = shape;
}
function zoomIn() {
  imageState.value.scaleX += 0.1;
  imageState.value.scaleY += 0.1;
}
function zoomOut() {
  imageState.value.scaleX -= 0.1;
  imageState.value.scaleY -= 0.1;
}
function setInitialImageState() {
  imageState.value.rotate = 0;
  imageState.value.scaleX = 1;
  imageState.value.scaleY = 1;
}
function setInitialCropFrameState() {
  if (!previewRef.value || !frameRef.value) return;
  cropState.value.top = `${(previewRef.value?.clientHeight || 0) / 2 - (frameRef.value?.clientHeight || 0) / 2}px`;
  cropState.value.left = `${(previewRef.value?.clientWidth || 0) / 2 - (frameRef.value?.clientWidth || 0) / 2}px`;
}
</script>

<style lang="scss" scoped src="./ImageCrop.style.scss"></style>
