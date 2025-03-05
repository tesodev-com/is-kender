<template>
  <div :class="toastClasses">
    <div class="toast">
      <div class="toast-content">
        <div
          v-if="title"
          class="toast-title"
        >
          {{ title }}
        </div>
        <div
          v-if="message"
          class="toast-message"
        >
          {{ message }}
        </div>
      </div>
      <span
        class="toast-close"
        @click="onClose"
      >
        <Svg
          :src="closeIcon"
          size="20"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastMessageProps } from 'library/Toast';
import { computed, onMounted } from 'vue';
import Svg from 'library/Svg';
import { closeIcon } from '@/assets/icons';

interface ToastMessageEmits {
  (e: 'close'): void;
}
const props = withDefaults(defineProps<ToastMessageProps>(), {
  variant: 'solid',
  color: 'primary',
});
const emit = defineEmits<ToastMessageEmits>();
const toastClasses = computed(() => {
  return ['toast-wrapper', `toast-${props.variant}`, `toast-${props.color}`];
});
onMounted(() => {
  if (props.life) {
    setTimeout(() => {
      onClose();
    }, props.life);
  }
});
function onClose() {
  emit('close');
}
</script>

<style lang="scss" scoped src="./ToastMessage.style.scss"></style>
