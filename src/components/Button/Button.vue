<template>
  <component
    :is="el"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps } from './Button.d.ts';
const props = withDefaults(defineProps<ButtonProps>(), {
  el: 'button',
  size: 'md',
  color: 'primary',
  variant: 'solid',
});
const buttonClasses = computed(() => {
  return ['button', `button-${props.variant}`, `button-${props.color}`, `button-${props.size}`, { 'button-fluid': props.fluid }];
});
</script>

<style lang="scss" scoped src="./Button.styles.scss"></style>
