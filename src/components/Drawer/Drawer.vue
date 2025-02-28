<template>
  <transition name="drawer">
    <div
      v-if="isOpen"
      class="overlay"
      @click="closeDrawer"
    >
      <div
        :class="drawerClasses"
        :style="drawerStyle"
        @click.stop
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
            X
          </button>
        </div>
        <div class="drawer-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
export interface DrawerProps {
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: '25%' | '50%' | '100%';
  title?: string;
  isOpen?: boolean;
  hasHeader?: boolean;
  hasCloseButton?: boolean;
}

const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'left',
  size: '50%',
  title: '',
  isOpen: false,
  hasHeader: true,
  hasCloseButton: true,
});

const emit = defineEmits(['update:isOpen']);

const closeDrawer = () => {
  emit('update:isOpen', false);
};

const drawerClasses = computed(() => ['drawer', `drawer-${props.position}`]);

const drawerStyle = computed(() => {
  return {
    '--drawer-size': props.size,
  };
});
</script>

<style lang="scss" scoped src="./Drawer.style.scss" />
