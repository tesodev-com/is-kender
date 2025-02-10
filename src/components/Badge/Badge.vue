<template>
  <span :class="badgeClass">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

export interface IBadgeProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
}

const props = withDefaults(defineProps<IBadgeProps>(), {
  variant: 'primary'
});

const badgeClass = computed(() => `badge badge-${props.variant}`);
</script>

<style lang="scss" scoped src="./Badge.style.scss"></style>