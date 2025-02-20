<template>
  <div class="row" :class="[computedClass]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface RowProps {
    /**
   * Vertical alignment of flex items
   * @default 'top'
   */
  align?: 'top' | 'center' | 'bottom';
  /**
   * Horizontal alignment of flex items
   * @default 'start'
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /**
   * Flex direction
   * @default 'row'
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /**
   * Spacing between columns
   * @default 0
   */
  gutter?: 0 | 1 | 2 | 3 | 4| 5 | 6
}

const props = withDefaults(defineProps<RowProps>(), {
  align: 'top',
  justify: 'start',
  gutter: 0,
});
const computedClass = computed(() => {
  return {
    [`row--align-${props.align}`]: props.align,
    [`row--justify-${props.justify}`]: props.justify,
    [`row--gutter-${props.gutter}`]: props.gutter,
    [`row--direction-${props.direction}`]: props.direction,
  };
});

</script>

<style lang="scss" scoped src="./Row.style.scss"></style>
