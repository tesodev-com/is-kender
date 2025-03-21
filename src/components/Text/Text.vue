<template>
  <component
    :is="size"
    :class="textClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { TextProps } from 'library-components/Text';
import { computed } from 'vue';

const props = withDefaults(defineProps<TextProps>(), {
  size: 'p',
  fontSize: 'sm',
  fontWeight: 'normal',
  fontColor: 'black',
});

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
</script>

<style lang="scss" scoped src="./Text.style.scss"></style>
