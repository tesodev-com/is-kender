<template>
  <div
    v-swipe="{ onSwipe }"
    class="swiper"
    :style="swiperStyles"
    @mouseover="onOver"
    @mouseleave="onLeave"
  >
    <div
      ref="swiperWrapperRef"
      class="swiper-wrapper"
      :style="wrapperStyles"
    >
      <component
        :is="slide"
        v-for="(slide, index) in renderToSlides"
        :key="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { vSwipe } from '@/directives/vSwipe';
import type { SwiperProps, SwiperSlots } from 'library/Swiper';
import { computed, onMounted, onUnmounted, useSlots, useTemplateRef, watch } from 'vue';
import { initialProps, state, useAutoplay, useSwiper } from './core';
import { useSlideEffect } from './effect';
// interfaces & types
// constants
// composable
const slots = useSlots();
// props
defineSlots<SwiperSlots>();
const props = withDefaults(defineProps<SwiperProps>(), initialProps);
// defineEmits

// states (refs and reactives)
const wrapperRef = useTemplateRef('swiperWrapperRef');
// computed
const swiperStyles = computed(() => ({
  '--slides-per-view': props.slidesPerView === 'auto' ? '1' : props.slidesPerView,
  '--space-between': `${props.spaceBetween}px`,
}));
// watchers
watch(
  () => state.value.activeIndex,
  (newIndex, oldIndex) => {
    if (newIndex !== oldIndex) {
      state.value.previousIndex = oldIndex;
      updateSlideClasses();
    }
  }
);
// lifecycles
const { renderToSlides, renderedSlideElements, updateSlideClasses } = useSwiper({ slots, wrapperRef });
const { onSwipe, wrapperStyles, slideNext } = useSlideEffect({ props, wrapperRef, renderedSlideElements });
const { autoPlay } = useAutoplay({ props, cb: slideNext });
onMounted(() => {
  updateSlideClasses();
  autoPlay('start');
});
onUnmounted(() => {
  autoPlay('stop');
});
// methods
function onOver() {
  autoPlay('stop');
}
function onLeave() {
  autoPlay('start');
}
</script>

<style lang="scss" scoped src="./Swiper.style.scss"></style>
