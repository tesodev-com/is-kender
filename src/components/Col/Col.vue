<template>
  <div
    class="col"
    :class="columnClasses"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ColSize = number | string;

interface Props {
  /**
   * Number of columns to span
   * @default ''
   */
  cols?: ColSize;
  /**
   * Number of columns to span from small breakpoint and up (≥576px)
   * @default ''
   */
  sm?: ColSize;
  /**
   * Number of columns to span from medium breakpoint and up (≥768px)
   * @default ''
   */
  md?: ColSize;
  /**
   * Number of columns to span from large breakpoint and up (≥992px)
   * @default ''
   */
  lg?: ColSize;
  /**
   * Number of columns to span from extra large breakpoint and up (≥1200px)
   * @default ''
   */
  xl?: ColSize;
  /**
   * Number of columns to span from extra extra large breakpoint and up (≥1400px)
   * @default ''
   */
  xxl?: ColSize;
}

const props = withDefaults(defineProps<Props>(), {
  cols: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  xxl: '',
});

const columnClasses = computed(() => {
  const classes: Record<string, boolean> = {};

  const breakpoints = Object.keys(props) as (keyof Props)[];
  breakpoints.forEach(key => {
    if (props[key]) classes[`col--${key}-${props[key]}`] = true;
  });
  return classes;
});
</script>

<style lang="scss" scoped src="./Col.style.scss"></style>
