<template>
  <component
    :is="tag"
    class="container"
    :class="[containerClass]"
    :style="containerStyle"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
// 📌 1. Imports
import { computed } from 'vue';

// 📌 2. Types & Interfaces
interface ContainerProps {
  /**
   * Maximum width of the container
   * @default '75rem'
   */
  maxWidth?: string;
  /**
   * Padding on the left and right sides
   * @default '1rem'
   */
  padding?: string;
  /**
   * If true, container will be full width without max-width
   * @default false
   */
  fluid?: boolean;
  /**
   * Optional tag for semantic HTML or styling purposes
   * @default undefined
   */
  tag?: 'main' | 'section' | 'article' | 'div';
}

const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: '75rem',
  padding: '1rem',
  fluid: false,
  tag: 'div'
});

const containerStyle = computed(() => ({
  maxWidth: props.fluid ? 'none' : props.maxWidth,
  padding: `0px ${props.padding}`,
}));

const containerClass = computed(() => ({
  'container--fluid': props.fluid,
  [`container--${props.tag}`]: props.tag,
}));
</script>

<style lang="scss" scoped src="./Container.style.scss"></style>