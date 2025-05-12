<template>
  <div
    class="col"
    :class="columnClasses"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { ColProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<ColProps>(), {
  cols: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  xxl: '',
});

// defineEmits

// defineSlots
// states (refs and reactives)

// computed
const columnClasses = computed(() => {
  const classes: Record<string, boolean> = {};

  const breakpoints = Object.keys(props) as (keyof ColProps)[];
  breakpoints.forEach(key => {
    if (props[key]) classes[`col--${key}-${props[key]}`] = true;
  });
  return classes;
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Col.style.scss"></style>
