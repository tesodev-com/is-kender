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

export function mapPlaceholders(template, placeholders) {
  Object.keys(placeholders).forEach(key => {
    template = template.replace(key, placeholders[key]);
  });
  return template;
}
