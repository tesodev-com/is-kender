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
import type { ContainerProps } from 'library-components/Container';
import { computed } from 'vue';

const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: '75rem',
  padding: '1rem',
  fluid: false,
  tag: 'div',
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
