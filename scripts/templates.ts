export const EXPORT_TEMPLATE = `export { default } from './ComponentName.vue';
export * from './types';
`;
export const COMPONENT_TEMPLATE = `<template>ComponentName</template>

<script setup lang="ts">
// imports

// interfaces & types

// constants

// composable

// props

// defineEmits

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./ComponentName.style.scss"></style>
`;
export const STYLE_TEMPLATE = '/* SCSS */';
export const TEST_TEMPLATE = '/* TEST */';
export const STORY_TEMPLATE = '/* STORY */';
export const COMPONENT_TYPES_TEMPLATE = `import type { DefineComponent } from '@/@types/core';

export interface ComponentNameProps {}

declare module 'vue' {
  export interface GlobalComponents {
    LibComponentName: DefineComponent<ComponentNameProps>;
  }
}
`;
