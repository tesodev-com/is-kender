<template>
  <div
    class="row"
    :class="[computedClass]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RowProps } from './types';

const props = withDefaults(defineProps<RowProps>(), {
  align: 'top',
  justify: 'start',
  gutter: 0,
});
const computedClass = computed(() => {
  return {
    [`row--align-${props.align}`]: props.align,
    [`row--justify-${props.justify}`]: props.justify,
    [`row--gutter-${props.gutter}`]: props.gutter,
    [`row--direction-${props.direction}`]: props.direction,
  };
});
</script>

<style lang="scss" scoped src="./Row.style.scss"></style>
