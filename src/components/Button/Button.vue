<template>
  <component
    :is="el"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <Svg
      v-if="rightIcon"
      :src="rightIcon"
      class="button-icon button-icon-left"
    ></Svg>
    <Spinner v-if="loading" />
    <slot>{{ text }}</slot>
    <Svg
      v-if="leftIcon"
      :src="leftIcon"
      class="button-icon button-icon-right"
    ></Svg>
  </component>
</template>

<script setup lang="ts">
// imports
import Spinner from 'library-components/Spinner';
import Svg from 'library-components/Svg';
import { computed } from 'vue';
import type { ButtonProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<ButtonProps>(), {
  el: 'button',
  size: 'md',
  color: 'primary',
  variant: 'solid',
});

// defineEmits

// states (refs and reactives)

// computed
const buttonClasses = computed(() => {
  return [
    'button',
    `button-${props.variant}`,
    `button-${props.color}`,
    `button-${props.size}`,
    { 'button-fluid': props.fluid, 'button-icon-only': props.iconOnly, [`button-${props.rounded}-rounded`]: props.rounded },
  ];
});
// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Button.style.scss"></style>
