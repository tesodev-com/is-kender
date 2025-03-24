<template>
  <slot></slot>
</template>

<script setup lang="ts">
import type { TabPanelProps } from './types';
defineOptions({
  name: 'TabPanel',
});

// imports
// inject
// interfaces & types

// constants

// composable

// props
defineProps<TabPanelProps>();

// defineEmits

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./TabPanel.style.scss"></style>
