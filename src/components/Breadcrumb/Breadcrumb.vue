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
        />
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { type BreadcrumbProps } from 'library/Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem.vue';

withDefaults(defineProps<BreadcrumbProps>(), {
  useRouter: true,
  separator: '/',
});
</script>

<style lang="scss" scoped src="./Breadcrumb.style.scss"></style>
