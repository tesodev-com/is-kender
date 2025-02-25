<template>
  <component
    :is="el"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <Svg
      v-if="loading"
      :src="loadingIcon"
      class="animate-spin"
    ></Svg>
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { loadingIcon } from '@/assets/icons';
import type { ButtonProps } from 'library/Button';
import Svg from 'library/Svg';
import { computed } from 'vue';
const props = withDefaults(defineProps<ButtonProps>(), {
  el: 'button',
  size: 'md',
  color: 'primary',
  variant: 'solid',
});
const buttonClasses = computed(() => {
  return [
    'button',
    `button-${props.variant}`,
    `button-${props.color}`,
    `button-${props.size}`,
    { 'button-fluid': props.fluid, 'button-icon-only': props.iconOnly, [`button-${props.rounded}-rounded`]: props.rounded },
  ];
});
</script>

<style lang="scss" scoped src="./Button.styles.scss"></style>
