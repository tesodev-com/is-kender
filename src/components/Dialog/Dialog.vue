<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="dialog-overlay"
      @click="onBackdropClick"
    >
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
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
                @click="close"
              >
                ×
              </button>
            </slot>
          </header>

          <section class="dialog-body">
            <slot>
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
    </div>
  </teleport>
</template>

<script setup lang="ts">
// imports
import { computed, getCurrentInstance, onBeforeUnmount, watch } from 'vue';
import type { DialogAction, DialogProps } from './types';

// interfaces & types

// constants
const instance = getCurrentInstance();
const hasHeaderSlot = !!instance?.slots.header;
const hasFooterSlot = !!instance?.slots.footer;

// composable

// props
const model = defineModel<boolean>({ default: false });
const props = defineProps<DialogProps>();

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const isOpen = computed(() => model.value);
const labelledId = computed(() => (props.title ? 'dialog-title' : ''));
const describedId = computed(() => (props.message ? 'dialog-desc' : ''));
const width = computed(() => props.width || '500px');

// watchers
watch(model, updateBodyOverflow);

// lifecycles
onBeforeUnmount(() => updateBodyOverflow(false));

// methods
function close() {
  model.value = false;
}

function onBackdropClick() {
  if (!props.persistent) {
    close();
  }
}

function handleActionClick(action: DialogAction) {
  action.onClick?.();
  if (action.key.toLowerCase() === 'close') {
    close();
  }
}

function beforeEnter(el: Element) {
  const element = el as HTMLElement;
  element.style.opacity = '0';
  element.style.transform = 'scale(0.95) translateY(20px)';
}

function enter(el: Element, done: () => void) {
  const element = el as HTMLElement;
  element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  requestAnimationFrame(() => {
    element.style.opacity = '1';
    element.style.transform = 'scale(1) translateY(0)';
    element.addEventListener('transitionend', done, { once: true });
  });
}

function beforeLeave(el: Element) {
  const element = el as HTMLElement;
  element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
  element.style.opacity = '1';
  element.style.transform = 'scale(1) translateY(0)';
}

function leave(el: Element, done: () => void) {
  const element = el as HTMLElement;
  requestAnimationFrame(() => {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.95) translateY(20px)';
    element.addEventListener('transitionend', done, { once: true });
  });
}

function updateBodyOverflow(isOpen: boolean) {
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
</script>

<style lang="scss" src="./Dialog.style.scss"></style>
