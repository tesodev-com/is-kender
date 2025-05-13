<template>
  <div
    class="image-cropper"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
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
        @mousedown="handleFrameDragStart"
      >
        <div
          v-for="resizePoint in resizePoints"
          :key="resizePoint.id"
          class="resize-handle"
          :class="resizePoint.class"
          @mousedown="handleFrameResizeStart(resizePoint.id, $event)"
        ></div>
      </div>
    </div>
    <div class="image-cropper__actions">
      <div
        v-for="action in actionList"
        :key="action.id"
        class="image-action"
      >
        <Button
          v-bind="action"
          color="primary"
          variant="solid"
          iconOnly
          @click="handleActionClick(action.id)"
        >
          <Svg
            size="1.5rem"
            :src="action.icon"
            :class="{ 'flip-vertical': action.id === 'flipVertical' }"
          ></Svg>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { actionList, resizePoints } from './constants';
import type { CropState, ImageCropperEvents, ImageCropperProps, ImageState } from './types';
import { createCroppedImage } from './utils';
// interfaces & types

// constants

// composable

// props
const props = defineProps<ImageCropperProps>();
// defineEmits
const emit = defineEmits<ImageCropperEvents>();

// states (refs and reactives)
const originalImage = ref<string | File | null>(null);
const previewRef = useTemplateRef('imagePreview');
const frameRef = useTemplateRef('cropFrame');
const imageState = ref<ImageState>({
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
  isResizing: false,
  resizeDirection: '',
  startX: 0,
  startY: 0,
  isDragging: false,
  dragOffset: {
    x: 0,
    y: 0,
  },
});
// computed
const getImage = computed(() => {
  if (!originalImage.value) {
    return new URL('../../assets/icons/empty.svg', import.meta.url).href;
  }
  if (originalImage.value instanceof File) {
    return URL.createObjectURL(originalImage.value) as string;
  }
  return originalImage.value as string;
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
watch(
  () => props.image,
  newImage => {
    originalImage.value = newImage;
    resetImageState();
    resetCropState();
  }
);
// lifecycles
originalImage.value = props.image;
onMounted(() => {
  resetImageState();
  resetCropState();
});
// methods
function resetImageState() {
  imageState.value.rotate = 0;
  imageState.value.scaleX = 1;
  imageState.value.scaleY = 1;
}
function resetCropState() {
  if (!previewRef.value || !frameRef.value) return;

  cropState.value.top = `${(previewRef.value?.clientHeight || 0) / 2 - (frameRef.value?.clientHeight || 0) / 2}px`;
  cropState.value.left = `${(previewRef.value?.clientWidth || 0) / 2 - (frameRef.value?.clientWidth || 0) / 2}px`;
  cropState.value.width = '100px';
  cropState.value.height = '100px';
  cropState.value.shape = 'circle';
  cropState.value.isResizing = false;
  cropState.value.resizeDirection = '';
  cropState.value.startX = 0;
  cropState.value.startY = 0;
  cropState.value.isDragging = false;
  cropState.value.dragOffset = {
    x: 0,
    y: 0,
  };
}
function handleFrameDragStart(event: MouseEvent) {
  if (!frameRef.value) return;

  event.preventDefault();
  event.stopPropagation();

  cropState.value.isDragging = true;
  const rect = frameRef.value.getBoundingClientRect();

  cropState.value.dragOffset = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
function handleFrameDragEnd() {
  cropState.value.isDragging = false;
}
function handleFrameResizeStart(direction: string, event: MouseEvent) {
  if (!event) return;

  event.preventDefault();
  event.stopPropagation();
  cropState.value.isResizing = true;
  cropState.value.resizeDirection = direction;
  cropState.value.startX = event.clientX;
  cropState.value.startY = event.clientY;
}
function handleFrameResizeEnd() {
  cropState.value.isResizing = false;
}
function handleMouseMove(event: MouseEvent) {
  if (cropState.value.isDragging) {
    event.preventDefault();
    event.stopPropagation();
    updateFramePosition(event);
  } else if (cropState.value.isResizing) {
    event.preventDefault();
    event.stopPropagation();
    updateFrameSize(event);
  }
}
function handleMouseUp(event: MouseEvent) {
  if (cropState.value.isResizing) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleFrameDragEnd();
  handleFrameResizeEnd();
}
function updateFramePosition(event: MouseEvent) {
  if (!cropState.value.isDragging || !previewRef.value || !frameRef.value) return;

  const previewRect = previewRef.value.getBoundingClientRect();

  let left = event.clientX - previewRect.left - cropState.value.dragOffset.x;
  let top = event.clientY - previewRect.top - cropState.value.dragOffset.y;

  cropState.value.left = `${left}px`;
  cropState.value.top = `${top}px`;
}
function updateFrameSize(event: MouseEvent) {
  if (!cropState.value.isResizing || !previewRef.value || !frameRef.value) return;

  const deltaX = event.clientX - cropState.value.startX;
  const deltaY = event.clientY - cropState.value.startY;

  const currentWidth = parseInt(String(cropState.value.width));
  const currentHeight = parseInt(String(cropState.value.height));
  const currentLeft = parseInt(String(cropState.value.left));
  const currentTop = parseInt(String(cropState.value.top));

  let newWidth = currentWidth;
  let newHeight = currentHeight;
  let newLeft = currentLeft;
  let newTop = currentTop;

  switch (cropState.value.resizeDirection) {
    case 'bl':
      newWidth = Math.max(currentWidth + deltaX, 50);
      newHeight = Math.max(currentHeight + deltaY, 50);
      break;
    case 'br':
      newWidth = Math.max(currentWidth - deltaX, 50);
      newLeft = currentLeft + deltaX;
      newHeight = Math.max(currentHeight + deltaY, 50);
      break;
    case 'tr':
      newWidth = Math.max(currentWidth + deltaX, 50);
      newHeight = Math.max(currentHeight - deltaY, 50);
      newTop = currentTop + deltaY;
      break;
    case 'tl':
      newWidth = Math.max(currentWidth - deltaX, 50);
      newHeight = Math.max(currentHeight - deltaY, 50);
      newLeft = currentLeft + deltaX;
      newTop = currentTop + deltaY;
      break;
    case 't':
      newHeight = Math.max(currentHeight - deltaY, 50);
      newTop = currentTop + deltaY;
      break;
    case 'b':
      newHeight = Math.max(currentHeight + deltaY, 50);
      break;
    case 'r':
      newWidth = Math.max(currentWidth + deltaX, 50);
      break;
    case 'l':
      newWidth = Math.max(currentWidth - deltaX, 50);
      newLeft = currentLeft + deltaX;
      break;
  }

  cropState.value.width = `${newWidth}px`;
  cropState.value.height = `${newHeight}px`;
  cropState.value.left = `${newLeft}px`;
  cropState.value.top = `${newTop}px`;

  cropState.value.startX = event.clientX;
  cropState.value.startY = event.clientY;
}
function rotateImageLeft() {
  imageState.value.rotate -= 90;
}
function rotateImageRight() {
  imageState.value.rotate += 90;
}
function flipImageHorizontal() {
  imageState.value.scaleX *= -1;
}
function flipImageVertical() {
  imageState.value.scaleY *= -1;
}
function zoomImageIn() {
  imageState.value.scaleX += 0.1;
  imageState.value.scaleY += 0.1;
}
function zoomImageOut() {
  imageState.value.scaleX -= 0.1;
  imageState.value.scaleY -= 0.1;
}
function uploadImage() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = event => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        originalImage.value = reader.result as string;
        resetImageState();
        resetCropState();
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}
async function applyImage() {
  const imageElement = document.querySelector('.image-cropper__image') as HTMLImageElement;
  if (!imageElement) return;

  try {
    const croppedImage = await createCroppedImage(imageElement, cropState.value, imageState.value);
    emit('crop', croppedImage);
  } catch (error) {
    console.error('Error creating cropped image:', error);
  }
}
function handleCancel() {
  emit('cancel');
}
function handleActionClick(action: (typeof actionList)[number]['id']) {
  switch (action) {
    case 'rotateLeft':
      rotateImageLeft();
      break;
    case 'rotateRight':
      rotateImageRight();
      break;
    case 'flipHorizontal':
      flipImageHorizontal();
      break;
    case 'flipVertical':
      flipImageVertical();
      break;
    case 'zoomIn':
      zoomImageIn();
      break;
    case 'zoomOut':
      zoomImageOut();
      break;
    case 'circle':
      updateCropShape('circle');
      break;
    case 'square':
      updateCropShape('square');
      break;
    case 'reset':
      resetImageState();
      resetCropState();
      break;
    case 'upload':
      uploadImage();
      break;
    case 'apply':
      applyImage();
      break;
    case 'cancel':
      handleCancel();
      break;
    default:
      break;
  }
}
function updateCropShape(shape: CropState['shape']) {
  cropState.value.shape = shape;
}
defineExpose({
  cropState,
  imageState,
  updateCropShape,
  rotateImageLeft,
  rotateImageRight,
  flipImageHorizontal,
  flipImageVertical,
  zoomImageIn,
  zoomImageOut,
  uploadImage,
  applyImage,
  resetImageState,
});
</script>

<style lang="scss" scoped src="./ImageCrop.style.scss"></style>
