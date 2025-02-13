<template>
  <component
    :is="el"
    :class="buttonClasses"
    v-bind="$attrs">
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface ButtonProps {
    el?: 'button' | 'a' | any;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
    variant?: 'solid' | 'outline' | 'ghost';
    text?: string;
    fluid?: boolean;
}
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
    { 'button-fluid': props.fluid }
  ];
});
</script>

<style lang="scss" scoped src="./Button.styles.scss"></style>
