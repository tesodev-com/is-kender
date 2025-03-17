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
    {{ swiperState }}
  </pre>
</template>

<script setup lang="ts">
// imports
import { vSwipe, type SwipeState } from '@/directives/vSwipe';
import type { SwiperProps, SwiperSlots, SwiperState } from 'library/Swiper';
import { computed, onMounted, onUnmounted, ref, useSlots, useTemplateRef, watch, type VNode } from 'vue';
// interfaces & types

// constants
let autoPlayInterval: NodeJS.Timeout | null = null;
// composable
const slots = useSlots();

// props
defineSlots<SwiperSlots>();
const props = withDefaults(defineProps<SwiperProps>(), {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  initialSlide: 0,
  speed: 0.5,
  autoplay: false,
  autoplayDelay: 3000,
  loop: false,
  rewind: false,
  allowTouchMove: true,
});
// defineEmits

// states (refs and reactives)
const slidesNode = ref<VNode[]>([]);
const wrapperRef = useTemplateRef('swiperWrapperRef');
const swiperState = ref<SwiperState>({
  translateX: 0,
  deltaX: 0,
  duration: 0,
  activeIndex: 0,
  previousIndex: 0,
  isBeginning: false,
  isEnd: false,
  totalSlidesWidth: 0,
  containerWidth: 0,
  lastTranslateX: 0,
  lastSlideIndex: 0,
});
// computed
const swiperStyles = computed(() => ({
  '--slides-per-view': props.slidesPerView === 'auto' ? '1' : props.slidesPerView,
  '--space-between': `${props.spaceBetween}px`,
}));
const wrapperStyles = computed(() => ({
  transform: `translateX(${currentTranslate.value}px)`,
  transitionDuration: `${swiperState.value.duration}ms`,
}));
const renderToSlides = computed(() => {
  let from = 0;
  let to = slidesNode.value.length;
  const data = [];
  for (let i = from; i < to; i++) {
    const slide = slidesNode.value[getModulo(i, slidesNode.value.length)];
    data.push(slide);
  }
  return data;
});
const currentTranslate = computed(() => {
  return swiperState.value.translateX + getLimitedDeltaX();
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
  () => swiperState.value.activeIndex,
  (newIndex, oldIndex) => {
    if (newIndex !== oldIndex) {
      swiperState.value.previousIndex = oldIndex;
      updateSlideClasses();
    }
  }
);
// lifecycles
setSlidesNode();
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
  swiperState.value.deltaX = event.deltaX;
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
  const safeIndex = Math.max(0, Math.min(index, swiperState.value.lastSlideIndex));
  if (safeIndex !== swiperState.value.activeIndex) swiperState.value.activeIndex = safeIndex;
  const slideElement = renderedSlideElements.value[swiperState.value.activeIndex] as HTMLElement;
  if (!slideElement) return;
  delayedExec(() => {
    swiperState.value.deltaX = 0;
    swiperState.value.translateX = -Math.min(swiperState.value.lastTranslateX, slideElement.offsetLeft);
    swiperState.value.duration = duration;
  }, duration).then(() => {
    swiperState.value.duration = 0;
    checkBoundaries();
  });
}
function slidePrev(offset = props.slidesPerGroup) {
  const prevIndex = swiperState.value.activeIndex - offset;
  if (props.rewind) {
    slideTo(swiperState.value.isBeginning ? swiperState.value.lastSlideIndex : prevIndex);
  } else {
    slideTo(prevIndex);
  }
}
function slideNext(offset = props.slidesPerGroup) {
  const nextIndex = swiperState.value.activeIndex + offset;
  if (props.rewind) {
    slideTo(swiperState.value.isEnd ? 0 : nextIndex);
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
  let limitedDeltaX = swiperState.value.deltaX;
  if (!props.loop && ((swiperState.value.isBeginning && swiperState.value.deltaX > 0) || (swiperState.value.isEnd && swiperState.value.deltaX < 0))) {
    limitedDeltaX *= 0.25;
  }
  return limitedDeltaX;
}
function checkBoundaries() {
  const offset = 5; // Prevents the slide from being stuck;
  let isOverLeft = -currentTranslate.value <= 0;
  let isOverRight = -currentTranslate.value >= swiperState.value.lastTranslateX - offset;

  if (props.loop) {
    isOverLeft = false;
    isOverRight = false;
  }

  swiperState.value.isBeginning = isOverLeft;
  swiperState.value.isEnd = isOverRight;
}
function calculationGeneral() {
  if (!wrapperRef.value) return;
  const totalSlidesWidth = Array.from(wrapperRef.value.children).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth + props.spaceBetween, 0);
  const containerWidth = wrapperRef.value.offsetWidth;
  swiperState.value.totalSlidesWidth = totalSlidesWidth;
  swiperState.value.containerWidth = containerWidth;

  if (!props.loop) {
    swiperState.value.lastTranslateX = totalSlidesWidth - containerWidth;
    swiperState.value.lastSlideIndex = renderedSlideElements.value.findIndex(el => el.offsetLeft >= swiperState.value.lastTranslateX);
  }
}
function setSlidesNode() {
  const defaultNodes = slots?.default?.() as VNode[];
  if (!defaultNodes || defaultNodes.length === 0) throw new Error('Swiper component must have at least one SwiperSlide child');
  const slides: VNode[] = [];
  getSlidesFromSlot(defaultNodes, slides);
  slidesNode.value = slides;
}
function getSlidesFromSlot(nodes: VNode[], slides: VNode[] = []): VNode[] {
  nodes.forEach((vnode, index) => {
    if (typeof vnode.type === 'symbol' && vnode.children) {
      getSlidesFromSlot(vnode.children as VNode[], slides);
    } else if (typeof vnode.type === 'object' && 'name' in vnode.type && vnode.type?.name === 'SwiperSlide') {
      if (vnode.props) Object.assign(vnode.props, { slideIndex: index });
      slides.push(vnode);
    }
  });
  return slides;
}
function updateSlideClasses(activeIndex = swiperState.value.activeIndex) {
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
function getModulo(index: number, length: number) {
  return ((index % length) + length) % length;
}
function delayedExec(callback: () => void, delay = 0) {
  callback();
  return new Promise<void>(resolve =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}
</script>

<style lang="scss" scoped src="./Swiper.style.scss"></style>
