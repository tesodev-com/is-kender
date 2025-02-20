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
          :slots="$slots"
        />
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import BreadcrumbItem from './BreadcrumbItem.vue';
import type { BreadcrumbItemProps } from './BreadcrumbItem.vue';
interface BreadcrumbProps {
  items: Omit<BreadcrumbItemProps, 'slots'>[];
  separator?: string;
}
withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
});
</script>

<style lang="scss" scoped src="./Breadcrumb.styles.scss"></style>
