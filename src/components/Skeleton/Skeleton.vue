<template>
  <div
    class="skeleton"
    :class="[classes]"
    :style="styles"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  shape?: 'circle' | 'rectangle';
  animation?: 'pulse' | 'wave' | 'none';
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: '1rem',
  animation: 'pulse',
  shape: 'rectangle',
});
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
</script>

<style lang="scss" scoped src="./Skeleton.styles.scss"></style>
