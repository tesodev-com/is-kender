<template>
  <component :is="is" :class="dividerClasses" />
</template>

<script setup lang="ts">

import { computed } from 'vue';

export interface IDivider {
   is?: string;
   layout?: 'horizontal' | 'vertical';
   roundedFull?: boolean;
   customClass?: string;
}

const props = withDefaults(defineProps<IDivider>(), {
  is: 'div',
  roundedFull: true,
  layout: 'horizontal',
});

const dividerClasses = computed(() => {
  return {
    divider: true,
    horizontal: props.layout === 'horizontal',
    vertical: props.layout === 'vertical',
    rounded: props.roundedFull,
    [`${props.customClass}`]: props.customClass,
  };
});

</script>

<style lang="scss" scoped src="./Divider.style.scss"></style>