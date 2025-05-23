<template>
  <Teleport to="body">
    <transition
      :name="computeTransition"
      @after-leave="emit('close')"
    >
      <div
        v-if="isOpen"
        :class="[drawerClasses]"
        :style="drawerStyle"
      >
        <div
          v-if="hasHeader"
          class="drawer-header"
        >
          <h3>{{ title }}</h3>
          <button
            v-if="hasCloseButton"
            @click="onClose"
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
        @click.stop="onClose"
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
// imports
import { closeIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { computed, onMounted, ref, watch } from 'vue';
import type { DrawerEmits, DrawerProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'left',
  size: '50%',
  title: '',
  hasHeader: true,
  hasCloseButton: true,
});

// defineEmits
const emit = defineEmits<DrawerEmits>();

// defineSlots

// states (refs and reactives)
const isOpen = ref(false);

// computed
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

// watchers
watch(
  () => isOpen.value,
  newValue => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      const drawers = document.querySelectorAll('.drawer');
      if (drawers.length <= 1) {
        document.body.style.overflow = 'auto';
      }
    }
  },
  { immediate: true }
);

// lifecycles
onMounted(() => {
  isOpen.value = true;
});

// methods
function onClose() {
  isOpen.value = false;
}
defineExpose({
  onClose,
});
</script>

<style lang="scss" scoped src="./Drawer.style.scss"></style>
