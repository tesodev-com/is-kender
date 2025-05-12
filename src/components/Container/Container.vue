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
// imports
import { computed } from 'vue';
import type { ContainerProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: '75rem',
  padding: '1rem',
  fluid: false,
  tag: 'div',
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const containerStyle = computed(() => ({
  maxWidth: props.fluid ? 'none' : props.maxWidth,
  padding: `0px ${props.padding}`,
}));

const containerClass = computed(() => ({
  'container--fluid': props.fluid,
  [`container--${props.tag}`]: props.tag,
}));

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Container.style.scss"></style>
