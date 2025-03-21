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
import type { BadgeProps } from 'library-components/Badge';
import { computed } from 'vue';

const props = withDefaults(defineProps<BadgeProps>(), {
  color: 'gray',
  size: 'sm',
  variant: 'solid',
  pill: true,
  dot: false,
  onlyIcon: false,
});

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
</script>

<style lang="scss" scoped src="./Badge.style.scss"></style>
