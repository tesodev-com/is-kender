<template>
  <Teleport to="body">
    <transition :name="computeTransition">
      <div
        v-if="isOpen"
        :class="drawerClasses"
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
    <transition name="fade">
      <div
        v-if="isOpen"
        class="overlay"
        @click.stop="closeDrawer"
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { closeIcon } from '@/assets/icons';
import type { DrawerProps } from 'library/Drawer';
import Svg from 'library/Svg';
import { computed, watch } from 'vue';

const isOpen = defineModel<boolean>('isOpen');

const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'left',
  size: '50%',
  title: '',
  hasHeader: true,
  hasCloseButton: true,
});

const emit = defineEmits(['update:isOpen']);

const computeTransition = computed(() => {
  const transition = {
    left: 'slide-left',
    right: 'slide-right',
    top: 'slide-up',
    bottom: 'slide-down',
  };
  return transition[props.position];
});

const drawerClasses = computed(() => ['drawer', `drawer-${props.position}`]);

const drawerStyle = computed(() => {
  return {
    '--drawer-size': props.size,
  };
});
watch(isOpen, newValue => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
function closeDrawer() {
  emit('update:isOpen', false);
}
</script>

<style lang="scss" scoped src="./Drawer.style.scss" />
