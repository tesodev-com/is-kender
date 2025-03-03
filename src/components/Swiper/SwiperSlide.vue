<template>
  <div
    class="swiper-slide"
    :data-index="cKey"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import { getCurrentInstance, ref } from 'vue';

// interfaces & types

// constants

// composable
defineOptions({
  name: 'SwiperSlide',
});
const instance = getCurrentInstance();
// props

// defineEmits

// states (refs and reactives)
const cKey = ref(instance ? instance.vnode.key : null);
// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped>
.swiper-slide {
  flex-shrink: 0;
  margin-right: var(--space-between);
  width: calc((100% - (var(--space-between) * (var(--slides-per-view) - 1))) / var(--slides-per-view));
}
</style>
