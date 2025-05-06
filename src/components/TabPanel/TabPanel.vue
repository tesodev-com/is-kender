<template>
  <slot></slot>
</template>

<script setup lang="ts">
// imports
import type { TabPanelProps } from './types';

// interfaces & types
defineOptions({
  name: 'TabPanel',
});

// constants

// composable

// props
defineProps<TabPanelProps>();

// defineEmits

// defineSlots

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./TabPanel.style.scss"></style>
