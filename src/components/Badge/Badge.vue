<template>
  <div :class="badgeClasses">
    <span
      v-if="dot"
      :class="dottedClasses"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { BadgeProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<BadgeProps>(), {
  color: 'gray',
  size: 'sm',
  variant: 'solid',
  pill: true,
  dot: false,
  onlyIcon: false,
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const badgeClasses = computed(() => {
  return [
    'badge',
    `badge-${props.variant}`,
    `badge-${props.color}`,
    `badge-${props.size}`,
    {
      'badge-pill': props.pill,
      'badge-only-icon': props.onlyIcon,
    },
  ];
});

const dottedClasses = computed(() => {
  return [`badge-dot-${props.color}`];
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Badge.style.scss"></style>
