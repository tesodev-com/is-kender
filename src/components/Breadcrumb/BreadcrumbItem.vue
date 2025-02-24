<template>
  <li class="breadcrumb-item">
    <template v-if="!slots?.item">
      <component :is="slots && icon && slots[icon]" />
      <component
        :is="useRouter ? 'router-link' : 'a'"
        :to="to || '#'"
      >
        {{ text }}
      </component>
    </template>
    <component
      :is="slots.item"
      v-else
      :item="slotProps"
    />
  </li>
</template>

<script setup lang="ts">
import type { BreadcrumbItemProps } from 'library/Breadcrumb';
import { computed } from 'vue';

const props = defineProps<BreadcrumbItemProps>();
const slotProps = computed(() => {
  return {
    text: props.text,
    to: props.to,
    icon: props.icon,
  };
});
</script>
