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
  <pre>
    {{ nearestSlide }}
    {{ state }}
  </pre>
</template>

<script setup lang="ts">
// imports
import { vSwipe, type SwipeState } from '@/directives/vSwipe';
import type { SwiperProps, SwiperSlots } from 'library/Swiper';
import { computed, onMounted, onUnmounted, useSlots, useTemplateRef, watch } from 'vue';
import { Helpers, initialProps, useSwiper } from './core';
// interfaces & types

// constants
let autoPlayInterval: NodeJS.Timeout | null = null;
// composable
const slots = useSlots();
const { state, renderToSlides } = useSwiper(slots);

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
const wrapperStyles = computed(() => ({
  transform: `translateX(${currentTranslate.value}px)`,
  transitionDuration: `${state.value.duration}ms`,
}));
const currentTranslate = computed(() => {
  return state.value.translateX + getLimitedDeltaX();
});
const renderedSlideElements = computed(() => {
  return Array.from(wrapperRef.value?.children || []) as HTMLElement[];
});
const nearestSlide = computed(() => {
  if (!wrapperRef.value) return 0;
  const { index } = renderedSlideElements.value.reduce<{ distance: number; slide: HTMLElement | null; index: number }>(
    (acc, el, index) => {
      const distance = Math.abs(el.offsetLeft - -currentTranslate.value);
      if (distance < acc.distance) {
        return { distance, slide: el, index };
      }
      return acc;
    },
    { distance: Infinity, slide: null, index: 0 }
  );
  return index;
});
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
onMounted(() => {
  calculationGeneral();
  slideTo(props.initialSlide);
  updateSlideClasses();
  autoPlay('start');
  window.addEventListener('resize', calculationGeneral);
});
onUnmounted(() => {
  autoPlay('stop');
  window.removeEventListener('resize', calculationGeneral);
});
// methods
function onSwipe(event: SwipeState) {
  if (!props.allowTouchMove) return;
  if (event.swipeState === 'start') onStart();
  if (event.swipeState === 'move') onMove(event);
  if (event.swipeState === 'end') onEnd(event);
}
function onStart() {
  autoPlay('stop');
}
function onMove(event: SwipeState) {
  state.value.deltaX = event.deltaX;
  updateSlideClasses(nearestSlide.value);
}
function onEnd(event: SwipeState) {
  if (event.swipeSpeed >= props.speed) {
    if (event.direction === 'right') slidePrev();
    if (event.direction === 'left') slideNext();
  } else {
    slideTo(nearestSlide.value);
  }
  autoPlay('start');
}
function onOver() {
  autoPlay('stop');
}
function onLeave() {
  autoPlay('start');
}
function slideTo(index: number, duration: number = 300) {
  if (!wrapperRef.value) return;
  const safeIndex = Math.max(0, Math.min(index, state.value.lastSlideIndex));
  if (safeIndex !== state.value.activeIndex) state.value.activeIndex = safeIndex;
  const slideElement = renderedSlideElements.value[state.value.activeIndex] as HTMLElement;
  if (!slideElement) return;
  Helpers.delayedExec(() => {
    state.value.deltaX = 0;
    state.value.translateX = -Math.min(state.value.lastTranslateX, slideElement.offsetLeft);
    state.value.duration = duration;
  }, duration).then(() => {
    state.value.duration = 0;
    checkBoundaries();
  });
}
function slidePrev(offset = props.slidesPerGroup) {
  const prevIndex = state.value.activeIndex - offset;
  if (props.rewind) {
    slideTo(state.value.isBeginning ? state.value.lastSlideIndex : prevIndex);
  } else {
    slideTo(prevIndex);
  }
}
function slideNext(offset = props.slidesPerGroup) {
  const nextIndex = state.value.activeIndex + offset;
  if (props.rewind) {
    slideTo(state.value.isEnd ? 0 : nextIndex);
  } else {
    slideTo(nextIndex);
  }
}
function autoPlay(status: 'start' | 'stop') {
  if (props.autoplay && status === 'start') {
    autoPlayInterval = setInterval(() => {
      slideNext();
    }, props.autoplayDelay);
  } else if (autoPlayInterval && status === 'stop') {
    clearInterval(autoPlayInterval);
  }
}
function getLimitedDeltaX() {
  let limitedDeltaX = state.value.deltaX;
  if (!props.loop && ((state.value.isBeginning && state.value.deltaX > 0) || (state.value.isEnd && state.value.deltaX < 0))) {
    limitedDeltaX *= 0.25;
  }
  return limitedDeltaX;
}
function checkBoundaries() {
  const offset = 5; // Prevents the slide from being stuck;
  let isOverLeft = -currentTranslate.value <= 0;
  let isOverRight = -currentTranslate.value >= state.value.lastTranslateX - offset;

  if (props.loop) {
    isOverLeft = false;
    isOverRight = false;
  }

  state.value.isBeginning = isOverLeft;
  state.value.isEnd = isOverRight;
}
function calculationGeneral() {
  if (!wrapperRef.value) return;
  const totalSlidesWidth = Array.from(wrapperRef.value.children).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth + props.spaceBetween, 0);
  const containerWidth = wrapperRef.value.offsetWidth;
  state.value.totalSlidesWidth = totalSlidesWidth;
  state.value.containerWidth = containerWidth;

  if (!props.loop) {
    state.value.lastTranslateX = totalSlidesWidth - containerWidth;
    state.value.lastSlideIndex = renderedSlideElements.value.findIndex(el => el.offsetLeft >= state.value.lastTranslateX);
  }
}
function updateSlideClasses(activeIndex = state.value.activeIndex) {
  if (!renderedSlideElements.value.length) return;
  renderedSlideElements.value.forEach((el, index) => {
    el.classList.remove('swiper-slide-prev', 'swiper-slide-next', 'swiper-slide-active');
    if (index === activeIndex - 1) {
      el.classList.add('swiper-slide-prev');
    } else if (index === activeIndex) {
      el.classList.add('swiper-slide-active');
    } else if (index === activeIndex + 1) {
      el.classList.add('swiper-slide-next');
    }
  });
}
</script>

<style lang="scss" scoped src="./Swiper.style.scss"></style>
