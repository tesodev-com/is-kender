<template>
  <div
    v-swipe="{ onSwipe }"
    class="swiper"
    :style="swiperStyles"
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
import { computed, onMounted, ref, useSlots, useTemplateRef, watch, type VNode } from 'vue';
// interfaces & types

// constants

// composable
const slots = useSlots();

// props
defineSlots<SwiperSlots>();
const props = withDefaults(defineProps<SwiperProps>(), {
  // Basic configuration
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  initialSlide: 0,

  // Behavior settings
  speed: 0.5,

  // Autoplay
  autoplay: false,
  autoplayDelay: 3000,

  // Loop and boundary behavior
  loop: false,
  rewind: false,
  allowTouchMove: true,
});
// defineEmits

// states (refs and reactives)
const slidesNode = ref<VNode[]>([]);
const wrapperRef = useTemplateRef('swiperWrapperRef');
const swiperState = ref<SwiperState>({
  // Position and size
  translateX: 0,
  deltaX: 0,
  duration: 0,

  // Indexes
  activeIndex: 0,
  virtualIndex: 0,

  // State flags
  isBeginning: false,
  isEnd: false,

  // Slide data
  totalSlidesWidth: 0,
  containerWidth: 0,
  lastTranslateX: 0,
  lastSlideIndex: 0,
});
// computed
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
const swiperStyles = computed(() => ({
  '--slides-per-view': props.slidesPerView === 'auto' ? '1' : props.slidesPerView,
  '--space-between': `${props.spaceBetween}px`,
}));
const wrapperStyles = computed(() => ({
  transform: `translateX(${swiperState.value.translateX + getLimitedDeltaX()}px)`,
  transitionDuration: `${swiperState.value.duration}ms`,
}));
const isLastSlideVisible = computed(() => {
  return !props.loop && swiperState.value.lastTranslateX <= -currentTranslate.value;
});
const isFirstSlideVisible = computed(() => {
  return !props.loop && -currentTranslate.value <= 0;
});
const currentTranslate = computed(() => {
  return swiperState.value.translateX + getLimitedDeltaX();
});
const renderedSlideElements = computed(() => {
  return Array.from(wrapperRef.value?.children || []) as HTMLElement[];
});
const nearestSlide = computed(() => {
  if (!wrapperRef.value) return { slide: null, index: 0 };
  const { slide, index } = renderedSlideElements.value.reduce<{ distance: number; slide: HTMLElement | null; index: number }>(
    (acc, el, index) => {
      const distance = Math.abs(el.offsetLeft - -currentTranslate.value);
      if (distance < acc.distance) {
        return { distance, slide: el, index };
      }
      return acc;
    },
    { distance: Infinity, slide: null, index: 0 }
  );
  return { slide, index };
});
// watchers
watch(
  () => swiperState.value.virtualIndex,
  () => {
    updateSlideClasses();
  }
);
// lifecycles
setSlidesNode();
onMounted(() => {
  calculationGeneral();
  updateSlideClasses();
  checkBoundaries();
  slideTo(props.initialSlide);
});
// methods
function onSwipe(event: SwipeState) {
  if (!props.allowTouchMove) return;
  if (event.swipeState === 'move') onMove(event);
  if (event.swipeState === 'end') onEnd();
}
function onMove(event: SwipeState) {
  swiperState.value.deltaX = event.deltaX;
  const nSlide = nearestSlide.value;
  swiperState.value.activeIndex = nSlide.index;
  swiperState.value.virtualIndex = getModulo(nSlide.index, renderedSlideElements.value.length);
}
function onEnd() {
  let index = swiperState.value.virtualIndex;
  if (isFirstSlideVisible.value) {
    index = props.rewind ? swiperState.value.lastSlideIndex : 0;
  } else if (isLastSlideVisible.value) {
    index = props.rewind ? 0 : swiperState.value.lastSlideIndex;
  }
  slideTo(index);
  checkBoundaries();
}
function slideTo(index: number, duration: number = 300) {
  if (!wrapperRef.value) return;
  const slideElement = renderedSlideElements.value[index] as HTMLElement;
  delayedExec(() => {
    swiperState.value.deltaX = 0;
    swiperState.value.translateX = -slideElement.offsetLeft;
    swiperState.value.duration = duration;
  }, duration).then(() => {
    swiperState.value.duration = 0;
  });
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
    swiperState.value.lastTranslateX = totalSlidesWidth - containerWidth - props.spaceBetween;
    swiperState.value.lastSlideIndex = renderedSlideElements.value.findIndex(el => el.offsetLeft + el.offsetWidth + props.spaceBetween >= swiperState.value.lastTranslateX);
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
function updateSlideClasses() {
  if (!renderedSlideElements.value.length) return;
  renderedSlideElements.value.forEach((el, index) => {
    if (index === swiperState.value.virtualIndex - 1) {
      el.classList.add('swiper-slide-prev');
      el.classList.remove('swiper-slide-next', 'swiper-slide-active');
    } else if (index === swiperState.value.virtualIndex) {
      el.classList.add('swiper-slide-active');
      el.classList.remove('swiper-slide-prev', 'swiper-slide-next');
    } else if (index === swiperState.value.virtualIndex + 1) {
      el.classList.add('swiper-slide-next');
      el.classList.remove('swiper-slide-prev', 'swiper-slide-active');
    } else {
      el.classList.remove('swiper-slide-prev', 'swiper-slide-next', 'swiper-slide-active');
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
