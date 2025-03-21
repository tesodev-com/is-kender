<template>
  <component
    :is="el"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <Spinner v-if="loading" />
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'library-components/Button';
import Spinner from 'library-components/Spinner';
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

<style lang="scss" scoped src="./Button.style.scss"></style>
