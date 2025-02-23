<template>
  <component
    :is="size"
    :class="textClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface IText {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontColor?: 'black' | 'white' | 'gray' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  customClass?: string;
}

const props = withDefaults(defineProps<IText>(), {
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
