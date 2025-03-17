<template>
  <div
    v-swipe="{ onSwipe }"
    class="swiper"
    :style="swiperStyles"
  >
    <div
      ref="swiperWrapperRef"
      class="swiper-wrapper"
    >
      <component
        :is="slide"
        v-for="(slide, index) in renderToSlides"
        :key="index"
      />
    </div>
  </div>
  <pre>
    {{ state }}
  </pre>
</template>

<script setup lang="ts">
// imports
import type { SwipeState } from '@/directives/vSwipe';
import { vSwipe } from '@/directives/vSwipe';
import type { SwiperProps, SwiperState } from 'library/Swiper';
import { Helpers } from 'library/Swiper/core';
import { computed, onMounted, onUnmounted, ref, useSlots, useTemplateRef, type VNode } from 'vue';
import type { EffectReturnType } from './effect/types';
// interfaces & types
// constants
let effect: EffectReturnType | null = null;
const effects = {
  slide: () => import('./effect/useSlideEffect'),
};
let interval: NodeJS.Timeout | null = null;
// composable
const slots = useSlots();
// props
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
  effect: 'slide',
});
// defineEmits
// states (refs and reactives)
const wrapperRef = useTemplateRef('swiperWrapperRef');
const slideNodes = ref<VNode[]>([]);
const state = ref<SwiperState>({
  swiperId: `swiper-${Helpers.generateUUID()}`,
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
const renderToSlides = computed(() => {
  const from = 0;
  const to = slideNodes.value.length;
  const data = [];
  for (let i = from; i < to; i++) {
    const slide = slideNodes.value[Helpers.getModulo(i, slideNodes.value.length)];
    data.push(slide);
  }
  return data;
});
const slideElements = computed(() => {
  return Array.from(wrapperRef.value?.children || []) as HTMLElement[];
});
// watchers
// lifecycles
setSlideNodes();
onMounted(async () => {
  await init();
  effect = await loadEffect();
  if (effect.init) effect.init();
  autoPlay('start');
});
onUnmounted(() => {
  autoPlay('stop');
});
// methods
async function init() {
  if (!wrapperRef.value) return;
  state.value.containerWidth = wrapperRef.value.offsetWidth;
  updateSlideClass();
}
function onSwipe(event: SwipeState) {
  if (!props.allowTouchMove) return;
  if (effect?.onSwipe) effect.onSwipe(event);
}
function slidePrev(offset = props.slidesPerGroup) {
  const prevIndex = state.value.activeIndex - offset;
  if (props.rewind) {
    effect?.slideTo(state.value.isBeginning ? state.value.lastSlideIndex : prevIndex);
  } else {
    effect?.slideTo(prevIndex);
  }
}
function slideNext(offset = props.slidesPerGroup) {
  const nextIndex = state.value.activeIndex + offset;
  if (props.rewind) {
    effect?.slideTo(state.value.isEnd ? 0 : nextIndex);
  } else {
    effect?.slideTo(nextIndex);
  }
}
function autoPlay(status: 'start' | 'stop') {
  if (props.autoplay && status === 'start') {
    interval = setInterval(() => {
      slideNext();
    }, props.autoplayDelay);
  } else if (interval && status === 'stop') {
    clearInterval(interval);
  }
}
function setWrapperStyle(style: Partial<CSSStyleDeclaration>) {
  if (!wrapperRef.value) return;
  Object.assign(wrapperRef.value.style, style);
}
function updateSlideClass(activeIndex = state.value.activeIndex) {
  if (!slideElements.value.length) return;
  slideElements.value.forEach((el, index) => {
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
async function loadEffect() {
  const effectArgs = { props, state, slideElements, setWrapperStyle, slidePrev, slideNext };
  if (effects[props.effect]) {
    const module = await effects[props.effect]();
    return module.default(effectArgs);
  } else {
    console.error('Effect not found');
    const defaultModule = await effects.slide();
    return defaultModule.default(effectArgs);
  }
}
function setSlideNodes() {
  const defaultNodes = slots?.default?.() as VNode[];
  if (!defaultNodes || defaultNodes.length === 0) throw new Error('Swiper component must have at least one SwiperSlide child');
  const slides: VNode[] = [];
  getSlidesFromSlot(defaultNodes, slides);
  slideNodes.value = slides;
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
</script>

<style lang="scss" scoped src="./Swiper.style.scss"></style>
