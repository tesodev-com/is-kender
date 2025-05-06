<template>
  <component
    :is="size"
    :class="textClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { TextProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<TextProps>(), {
  size: 'p',
  fontSize: 'sm',
  fontWeight: 'normal',
  fontColor: 'black',
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const textClasses = computed(() => {
  return [
    'text',
    `${['p', 'span'].includes(props.size) ? 'text' : 'heading'}-${props.fontSize}`,
    `font-${props.fontWeight}`,
    `color-${props.fontColor}`,
    {
      [`${props.customClass}`]: props.customClass,
    },
  ];
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Text.style.scss"></style>
