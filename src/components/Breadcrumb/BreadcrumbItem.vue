<template>
  <li class="breadcrumb-item">
    <template v-if="!slots?.item">
      <component :is="slots && icon && slots[icon]" />
      <router-link :to="to || '#'">
        {{ text }}
      </router-link>
    </template>
    <component :is="slots.item" v-else :item="slotProps" />
  </li>
</template>

<script setup lang="ts">
import { computed, type SetupContext } from 'vue';
export interface BreadcrumbItemProps {
    text: string;
    to: string;
    icon?: string;
    slots?: SetupContext['slots'];
}
const props = defineProps<BreadcrumbItemProps>();
const slotProps = computed(() => {
  return {
    text: props.text,
    to: props.to,
    icon: props.icon
  };
});
</script>

<style lang="postcss" scoped></style>