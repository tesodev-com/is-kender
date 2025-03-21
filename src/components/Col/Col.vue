<template>
  <div
    class="col"
    :class="columnClasses"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ColProps } from 'library-components/Col';
import { computed } from 'vue';

const props = withDefaults(defineProps<ColProps>(), {
  cols: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  xxl: '',
});

const columnClasses = computed(() => {
  const classes: Record<string, boolean> = {};

  const breakpoints = Object.keys(props) as (keyof ColProps)[];
  breakpoints.forEach(key => {
    if (props[key]) classes[`col--${key}-${props[key]}`] = true;
  });
  return classes;
});
</script>

<style lang="scss" scoped src="./Col.style.scss"></style>
