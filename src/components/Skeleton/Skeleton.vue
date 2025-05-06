<template>
  <div
    class="skeleton"
    :class="[classes]"
    :style="styles"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { SkeletonProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: '1rem',
  animation: 'pulse',
  shape: 'rectangle',
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const classes = computed(() => ({
  'skeleton-circle': props.shape === 'circle',
  'skeleton-pulse': props.animation === 'pulse',
  'skeleton-wave': props.animation === 'wave',
}));

const styles = computed(() => {
  return {
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
  };
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Skeleton.style.scss"></style>
