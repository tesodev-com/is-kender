<template>
  <li class="breadcrumb-item">
    <template v-if="!slots?.item">
      <component :is="slots && icon && slots[icon]" />
      <Link
        :to="to || '#'"
        :useRouter="useRouter"
        fontSize="md"
        fontColor="gray"
        :fontWeight="last ? 'semibold' : 'normal'"
        class="breadcrumb-item-link"
      >
        {{ text }}
      </Link>
    </template>
    <component
      :is="slots.item"
      v-else
      :item="slotProps"
    />
  </li>
</template>

<script setup lang="ts">
import Link from 'library-components/Link';
import { computed } from 'vue';
import type { BreadcrumbItemProps } from './types';

const props = defineProps<BreadcrumbItemProps>();
const slotProps = computed(() => {
  return {
    text: props.text,
    to: props.to,
    icon: props.icon,
  };
});
</script>
