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
import { closeIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import type { ToastMessageProps } from 'library-components/Toast';
import { computed, onMounted } from 'vue';

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
