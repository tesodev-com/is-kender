<template>
  <div class="col" :class="columnClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ColSize = number | string;

interface Props {
  cols?: ColSize
  sm?: ColSize
  md?: ColSize
  lg?: ColSize
  xl?: ColSize
  xxl?: ColSize
}

const props = withDefaults(defineProps<Props>(), {
  cols: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  xxl: ''
});

const columnClasses = computed(() => {
  const classes: Record<string, boolean> = {};

  const breakpoints = Object.keys(props) as (keyof Props)[];
  breakpoints.forEach((key) => {
    if (props[key]) classes[`col-${key}-${props[key]}`] = true;
  });

  return classes;
});
</script>

<style lang="scss" scoped src="./Col.style.scss"></style>
