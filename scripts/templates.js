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
export const dtsFile = `/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type DefineComponent } from 'vue';

export interface $templateProps {}

declare const $template: DefineComponent<$templateProps>;

declare module 'vue' {
  export interface GlobalComponents {
    $template: typeof $template;
  }
}

export default $template;
`;
export const packageJson = `{
    "main": "./$template.vue",
    "module": "./$template.vue",
    "types": "./$template.d.ts",
    "exports": {
        ".": {
            "types": "./$template.d.ts",
            "import": "./$template.vue"
        }
    }
}`;
export const scssFile = '/* SCSS */';
export const testFile = '/* TEST */';
export const storyFile = '/* STORY */';

export function mapPlaceholders(template, placeholders) {
  Object.keys(placeholders).forEach(key => {
    template = template.replace(new RegExp(`\\${key}`, 'g'), placeholders[key]);
  });
  return template;
}
