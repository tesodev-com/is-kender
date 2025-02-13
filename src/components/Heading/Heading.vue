<template>
  <component :is="size" :class="headingClasses">
    <slot/>
  </component>
</template>

<script setup lang="ts">

import { computed } from 'vue';

export interface IHeading {
   size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
   fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
   fontColor?: 'black' | 'white' | 'gray' | 'brand' | 'success' | 'info' | 'warning' | 'danger';
   customClass?: string;
}

const props = withDefaults(defineProps<IHeading>(), {
  size: 'h1',
  fontSize: 'lg',
  fontWeight: 'bold',
  fontColor: 'black'
});

const headingClasses = computed(() => {
  return [
    'heading',
    `heading-${props.fontSize}-${props.fontWeight}-${props.fontColor}`,
    {
      [`${props.customClass}`]: props.customClass,
    }
  ];
});

</script>

<style lang="scss" scoped src="./Heading.style.scss"></style>