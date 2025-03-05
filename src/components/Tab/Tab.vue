<template>
  <div>
    <slot>
      {{ name }}
    </slot>
  </div>
</template>

<script setup lang="ts">
// imports
import type { TabProps } from 'library/Tab';
// interfaces & types

// constants

// composable

// props
defineProps<TabProps>();
// defineEmits

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Tab.style.scss"></style>
