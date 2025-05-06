<template>
  <div
    class="row"
    :class="[computedClass]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { RowProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<RowProps>(), {
  align: 'top',
  justify: 'start',
  gutter: 0,
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const computedClass = computed(() => {
  return {
    [`row--align-${props.align}`]: props.align,
    [`row--justify-${props.justify}`]: props.justify,
    [`row--gutter-${props.gutter}`]: props.gutter,
    [`row--direction-${props.direction}`]: props.direction,
  };
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Row.style.scss"></style>
