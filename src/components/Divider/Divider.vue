<template>
  <component
    :is="is"
    :class="dividerClasses"
  />
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { DividerProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<DividerProps>(), {
  is: 'div',
  roundedFull: true,
  layout: 'horizontal',
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const dividerClasses = computed(() => {
  return {
    divider: true,
    horizontal: props.layout === 'horizontal',
    vertical: props.layout === 'vertical',
    rounded: props.roundedFull,
    [`${props.customClass}`]: props.customClass,
  };
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Divider.style.scss"></style>
