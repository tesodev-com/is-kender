<template>
  <nav class="breadcrumb">
    <ol class="breadcrumb-list">
      <template v-for="(breadCrumb, index) in items" :key="index">
        <template v-if="index !== 0">
          <slot name="seperator">
            <span class="breadcrumb-seperator">{{ seperator }}</span>
          </slot>
        </template>
        <BreadcrumbItem v-bind="breadCrumb" :slots="$slots" />
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import BreadcrumbItem, { type BreadcrumbItemProps } from './BreadcrumbItem.vue';
interface BreadcrumbProps {
    items: Omit<BreadcrumbItemProps, 'slots'>[];
    seperator?: string;
}
withDefaults(defineProps<BreadcrumbProps>(), {
  seperator: '/'
});
</script>

<style lang="scss" scoped src="./Breadcrumb.styles.scss"></style>
