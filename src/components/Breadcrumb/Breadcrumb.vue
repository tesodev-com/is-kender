<template>
  <nav class="breadcrumb">
    <ol class="breadcrumb-list">
      <template
        v-for="(breadCrumb, index) in items"
        :key="index"
      >
        <template v-if="index !== 0">
          <slot name="separator">
            <span class="breadcrumb-separator">{{ separator }}</span>
          </slot>
        </template>
        <BreadcrumbItem
          v-bind="breadCrumb"
          :useRouter="useRouter"
          :slots="$slots"
          :last="index + 1 === items.length"
        />
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
// imports
import BreadcrumbItem from './BreadcrumbItem.vue';
import type { BreadcrumbProps } from './types';

// interfaces & types

// constants

// composable

// props
withDefaults(defineProps<BreadcrumbProps>(), {
  useRouter: true,
  separator: '/',
});

// defineEmits

// defineSlots

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Breadcrumb.style.scss"></style>
