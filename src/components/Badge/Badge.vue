<template>
  <div :class="badgeClasses">
    <span v-if="dot" :class="dottedClasses" />
    <slot/>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

export interface IBadge {
   color?: 'gray' | 'primary' |'error' | 'warning' |'success' |'blue-gray' | 'blue-light' |'blue' |'indigo' |'purple' |'pink' |'orange'
   size?: 'sm' | 'md' | 'lg'
   variant?: 'solid' |'outline' |'modern'
   pill?: boolean
   dot?: boolean
   onlyIcon?: boolean
}

const props = withDefaults(defineProps<IBadge>(), {
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
    }
  ];
});

const dottedClasses = computed(() => {
  return [
    `badge-dot-${props.color}`
  ];
});

</script>

<style lang="scss" scoped src="./Badge.style.scss"></style>