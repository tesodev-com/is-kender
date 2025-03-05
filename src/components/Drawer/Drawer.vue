<template>
  <Teleport to="body">
    <transition
      :name="computeTransition"
      appear
    >
      <div
        v-if="isOpen"
        :class="[drawerClasses, closingAnimation]"
        :style="drawerStyle"
      >
        <div
          v-if="hasHeader"
          class="drawer-header"
        >
          <h3>{{ title }}</h3>
          <button
            v-if="hasCloseButton"
            @click="closeDrawer"
          >
            <Svg
              :src="closeIcon"
              size="20"
            ></Svg>
          </button>
        </div>
        <div class="drawer-content">
          <slot />
        </div>
      </div>
    </transition>
    <transition
      name="fade"
      appear
    >
      <div
        v-if="isOpen"
        class="overlay"
        :class="closingAnimationOverlay"
        @click.stop="closeDrawer"
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { closeIcon } from '@/assets/icons';
import type { DrawerProps } from 'library/Drawer';
import Svg from 'library/Svg';
import { computed, ref, watch } from 'vue';
const closing = ref(false);
const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'left',
  size: '50%',
  title: '',
  hasHeader: true,
  hasCloseButton: true,
  isOpen: false,
});

const emit = defineEmits(['toggle']);

const computeTransition = computed(() => {
  const transition = {
    left: 'slide-left',
    right: 'slide-right',
    up: 'slide-up',
    down: 'slide-down',
  };
  return transition[props.position];
});

const drawerClasses = computed(() => ['drawer', `drawer-${props.position}`]);

const drawerStyle = computed(() => {
  return {
    '--drawer-size': props.size,
  };
});
const closingAnimation = computed(() => {
  if (closing.value) {
    return `${computeTransition.value}-leave-active  ${computeTransition.value}-leave-to `;
  } else {
    return '';
  }
});
const closingAnimationOverlay = computed(() => {
  if (closing.value) {
    return 'fade-leave-active  fade-leave-to';
  }
  return '';
});
watch(
  () => props.isOpen,
  newValue => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    }
  },
  { immediate: true }
);

function closeDrawer() {
  const drawers = document.querySelectorAll('.drawer');
  if (drawers.length <= 1) {
    document.body.style.overflow = 'auto';
  }
  closing.value = true;
  setTimeout(() => {
    emit('toggle');
  }, 500);
}
</script>

<style lang="scss" scoped src="./Drawer.style.scss" />
