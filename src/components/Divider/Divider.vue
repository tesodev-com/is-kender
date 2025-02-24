<template>
  <component
    :is="is"
    :class="dividerClasses"
  />
</template>

<script setup lang="ts">
import type { DividerProps } from 'library/Divider';
import { computed } from 'vue';

const props = withDefaults(defineProps<DividerProps>(), {
  is: 'div',
  roundedFull: true,
  layout: 'horizontal',
});

const dividerClasses = computed(() => {
  return {
    divider: true,
    horizontal: props.layout === 'horizontal',
    vertical: props.layout === 'vertical',
    rounded: props.roundedFull,
    [`${props.customClass}`]: props.customClass,
  };
});
</script>

<style lang="scss" scoped src="./Divider.style.scss"></style>
