export const indexFile = `export { default } from './Link.vue';
export * from './types';
`;
export const vueFile = `<template>$template</template>

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

<style lang="scss" scoped src="./$scssFile"></style>
`;
export const scssFile = '/* SCSS */';
export const testFile = '/* TEST */';
export const storyFile = '/* STORY */';
export const typesFile = '/* TYPES */';

export function mapPlaceholders(template, placeholders) {
  Object.keys(placeholders).forEach(key => {
    template = template.replace(new RegExp(`\\${key}`, 'g'), placeholders[key]);
  });
  return template;
}
