<template>
  <component
    :is="props.useRouter && !props.isExternal ? 'router-link' : 'a'"
    v-bind="linkAttributes"
    :class="linkClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { LinkProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<LinkProps>(), {
  useRouter: false,
  target: '_self',
  fontSize: 'sm',
  fontWeight: 'normal',
  fontColor: 'primary',
  disabled: false,
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed
const linkClasses = computed(() => {
  return [
    'link',
    `link-${props.fontSize}`,
    `link-${props.fontWeight}`,
    `color-${props.fontColor}`,
    {
      'link-underline': props.underline,
      'link-disabled': props.disabled,
    },
  ];
});

const linkAttributes = computed(() => {
  return {
    ...(props.useRouter && !props.isExternal ? { to: !props.disabled ? props.to : undefined } : { href: !props.disabled ? props.to : undefined }),
    ...(props.title ? { title: props.title } : {}),
    ...(props.rel ? { rel: props.rel } : {}),
    ...(props.target && props.target !== '_self' ? { target: props.target } : {}),
  };
});

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Link.style.scss"></style>
