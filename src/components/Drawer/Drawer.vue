<template>
  <Teleport to="body">
    <transition
      :name="computeTransition"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="isOpen"
        v-bind="$attrs"
        :class="drawerClasses"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'drawer-title' : undefined"
      >
        <div
          v-if="hasHeader"
          class="drawer-header"
        >
          <slot name="header">
            <h3
              :id="title ? 'drawer-title' : undefined"
              class="drawer-title"
            >
              {{ title }}
            </h3>
            <button
              v-if="hasCloseButton"
              class="drawer-close-button"
              :disabled="isLoading"
              @click="handleClose"
            >
              <Svg
                :src="closeIcon"
                size="20"
              ></Svg>
            </button>
          </slot>
        </div>
        <div class="drawer-content">
          <slot name="body" />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="isOpen && props.hasOverlay"
        class="overlay"
        :style="overlayStyle"
        @click.stop="handleOverlayClick"
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
// imports
import { closeIcon } from '@/assets/icons';
import { drawerManager, setupGlobalEscListener } from '@/composables/useDrawerManager';
import Svg from 'library-components/Svg';
import { useStacking } from 'library-composables/useStacking';
import { computed, onMounted, ref, watch } from 'vue';
import type { DrawerEmits, DrawerProps, DrawerSlots } from './types';

// interfaces & types

// constants

// composable
const { zIndex } = useStacking();

// props
const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'left',
  size: '50%',
  title: '',
  hasHeader: true,
  hasCloseButton: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  beforeClose: undefined,
  hasOverlay: true,
  disableBodyScroll: true,
});

// defineEmits
const emit = defineEmits<DrawerEmits>();

// defineSlots
defineSlots<DrawerSlots>();

// states (refs and reactives)
const isOpen = ref(false);
const isLoading = ref(false);

setupGlobalEscListener();

// computed
const computeTransition = computed(() => {
  const transitions = {
    left: 'slide-left',
    right: 'slide-right',
    up: 'slide-up',
    down: 'slide-down',
  };
  return transitions[props.position];
});

const drawerClasses = computed(() => ['drawer', `drawer-${props.position}`]);

const drawerStyle = computed(() => ({
  '--drawer-size': props.size,
  zIndex: zIndex.value,
}));

const overlayStyle = computed(() => ({
  zIndex: zIndex.value - 1,
}));

// methods
async function handleClose() {
  if (isLoading.value) return;

  if (props.beforeClose) {
    isLoading.value = true;
    let result;
    try {
      result = props.beforeClose();
      if (result instanceof Promise) {
        result = await result;
      }
    } catch {
      isLoading.value = false;
      return;
    }
    isLoading.value = false;
    if (!result) return;
  }
  closeModal();
}

function handleOverlayClick() {
  if (props.closeOnOverlayClick) handleClose();
}

function onAfterLeave() {
  emit('close');
}

function openModal() {
  isOpen.value = true;
  drawerManager.addDrawer({
    id: zIndex.value,
    close: handleClose,
    keyboard: props.closeOnEscape,
  });
}

function closeModal() {
  isOpen.value = false;
  if (zIndex.value) {
    drawerManager.removeDrawer(zIndex.value);
  }
}

// watchers
watch(
  isOpen,
  newValue => {
    if (newValue) {
      if (props.disableBodyScroll) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      const drawers = document.querySelectorAll('.drawer');
      if (drawers.length <= 1 && props.disableBodyScroll) {
        document.body.style.overflow = 'auto';
      }
    }
  },
  { immediate: true }
);

// lifecycles
onMounted(() => {
  openModal();
});

defineExpose({
  onClose: handleClose,
  onOpen: openModal,
});
</script>

<style lang="scss" scoped src="./Drawer.style.scss"></style>
