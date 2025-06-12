<template>
  <teleport to="body">
    <transition
      appear
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        v-if="isOpen"
        class="dialog-container"
        :style="{ width }"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="labelledId"
        :aria-describedby="describedId"
        @click.stop
      >
        <header
          v-if="hasHeaderSlot || title"
          class="dialog-header"
        >
          <slot name="header">
            <h2 :id="labelledId">
              {{ title }}
            </h2>
            <button
              class="dialog-close"
              @click="onClose"
            >
              ×
            </button>
          </slot>
        </header>

        <section class="dialog-body">
          <slot name="body">
            <p
              v-if="message"
              :id="describedId"
            >
              {{ message }}
            </p>
          </slot>
        </section>

        <footer
          v-if="hasFooterSlot || actions?.length"
          class="dialog-footer"
        >
          <slot name="footer">
            <button
              v-for="action in actions"
              :key="action.key"
              class="dialog-button"
              :class="`dialog-button--${action.variant || 'primary'}`"
              @click="() => handleActionClick(action)"
            >
              {{ action.label }}
            </button>
          </slot>
        </footer>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="overlay"
        @click="onBackdropClick"
      ></div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
// imports
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { DialogAction, DialogEmits, DialogProps } from './types';

// interfaces & types

// constants
const instance = getCurrentInstance();
const hasHeaderSlot = !!instance?.slots.header;
const hasFooterSlot = !!instance?.slots.footer;

// composable

// props
const props = defineProps<DialogProps>();

// defineEmits
const emit = defineEmits<DialogEmits>();

// defineSlots

// states (refs and reactives)
const isOpen = ref(false);

// computed
const labelledId = computed(() => (props.title ? 'dialog-title' : ''));
const describedId = computed(() => (props.message ? 'dialog-desc' : ''));
const width = computed(() => props.width || '500px');

// watchers
watch(isOpen, updateBodyOverflow);

// lifecycles
onMounted(() => {
  isOpen.value = true;
});
onBeforeUnmount(() => {
  updateBodyOverflow(false);
  onClose();
});

// methods
function onClose() {
  isOpen.value = false;
}

function onBackdropClick() {
  if (!props.persistent) {
    onClose();
  }
}

function handleActionClick(action: DialogAction) {
  action.onClick?.();
  if (action.key.toLowerCase() === 'close') {
    onClose();
  }
}

function beforeEnter(el: Element) {
  const element = el as HTMLElement;
  element.style.opacity = '0';
}

function enter(el: Element, done: () => void) {
  const element = el as HTMLElement;
  element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  requestAnimationFrame(() => {
    element.style.opacity = '1';
    element.addEventListener('transitionend', done, { once: true });
  });
}

function beforeLeave(el: Element) {
  const element = el as HTMLElement;
  element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
  element.style.opacity = '1';
}

function leave(el: Element, done: () => void) {
  const element = el as HTMLElement;
  requestAnimationFrame(() => {
    element.style.opacity = '0';
    element.addEventListener('transitionend', done, { once: true });
  });
}

function afterLeave() {
  emit('close');
}

function updateBodyOverflow(isOpen: boolean) {
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

defineExpose({
  onClose,
});
</script>

<style lang="scss" src="./Dialog.style.scss"></style>
