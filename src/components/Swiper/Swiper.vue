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
</template>

<script setup lang="ts">
import { vSwipe, type SwipeState } from '@/directives/vSwipe';
import type { SwiperProps, SwiperSlots, SwiperState } from 'library/Swiper';
import { computed, onMounted, ref, useSlots, useTemplateRef, type VNode } from 'vue';
// imports

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
  allowTouchMove: true,
});
// defineEmits

// states (refs and reactives)
const wrapperRef = useTemplateRef('swiperWrapperRef');
const swiperState = ref<SwiperState>({
  // Position and movement
  translateX: 0,
  deltaX: 0,
  duration: 0,

  // Indexes
  activeIndex: 0,

  // State flags
  isBeginning: false,
  isEnd: false,

  // Slide data
  snapGrid: [],
  slidesWidth: [],
  totalSlidesWidth: 0,
  containerWidth: 0,
});
const slidesNodes = ref<VNode[]>([]);
// computed
const swiperStyles = computed(() => ({
  '--slides-per-view': props.slidesPerView === 'auto' ? '1' : props.slidesPerView,
  '--space-between': `${props.spaceBetween}px`,
}));
const wrapperStyles = computed(() => ({
  transform: `translateX(${swiperState.value.translateX + getLimitedDeltaX()}px)`,
  transitionDuration: `${swiperState.value.duration}ms`,
}));
const renderToSlides = computed(() => {
  const from = 0;
  const to = slidesNodes.value.length;
  const data = [];
  for (let i = from; i < to; i++) {
    const slide = slidesNodes.value[i];
    if (slide.props) {
      if (i === swiperState.value.activeIndex) {
        slide.props.class = 'swiper-slide-active';
      } else if (i === swiperState.value.activeIndex - 1) {
        slide.props.class = 'swiper-slide-prev';
      } else if (i === swiperState.value.activeIndex + 1) {
        slide.props.class = 'swiper-slide-next';
      } else {
        slide.props.class = '';
      }
    }
    data.push(slide);
  }
  return data;
});
// watchers

// lifecycles
setSlidesNodes();
onMounted(() => {
  calculationGeneral();
  slideTo(props.initialSlide, 0);
  autoPlay();
});
// methods
function onSwipe(event: SwipeState) {
  if (!props.allowTouchMove) return;
  swiperState.value.deltaX = event.deltaX;
  if (event.swipeState === 'end') {
    determineTargetSlide(event);
  }
}
function slideTo(index: number = swiperState.value.activeIndex, duration: number = 300) {
  if (props.loop) {
    index = ((index % swiperState.value.snapGrid.length) + swiperState.value.snapGrid.length) % swiperState.value.snapGrid.length;
  }

  swiperState.value.activeIndex = index;
  delayedExec(() => {
    swiperState.value.deltaX = 0;
    swiperState.value.translateX = -swiperState.value.snapGrid[index];
    swiperState.value.duration = duration;
  }).then(() => {
    swiperState.value.duration = 0;
    checkBoundaries();
  });
}
function determineTargetSlide(event: SwipeState) {
  if (event.swipeSpeed > props.speed) {
    if (event.direction === 'left' && !swiperState.value.isEnd) {
      slideNext();
    } else if (event.direction === 'right' && !swiperState.value.isBeginning) {
      slidePrev();
    } else {
      slideTo();
    }
  } else {
    slideTo(findNearestSlideIndex());
  }
}
function autoPlay() {
  if (!props.autoplay) return;
  return setInterval(() => {
    slideNext();
  }, props.autoplayDelay);
}
function slidePrev() {
  const { isBeginning, activeIndex } = swiperState.value;
  if (isBeginning) return;
  const prevIndex = props.loop ? getModulo(activeIndex - props.slidesPerGroup) : Math.max(activeIndex - props.slidesPerGroup, 0);
  slideTo(prevIndex);
}
function slideNext() {
  const { isEnd, activeIndex, snapGrid } = swiperState.value;
  if (isEnd) return;
  const nextIndex = props.loop ? getModulo(activeIndex + props.slidesPerGroup) : Math.min(activeIndex + props.slidesPerGroup, snapGrid.length - 1);
  slideTo(nextIndex);
}
function findNearestSlideIndex() {
  const { snapGrid, translateX, deltaX, totalSlidesWidth, containerWidth, activeIndex } = swiperState.value;
  if (!snapGrid.length) return 0;
  const currentTranslate = translateX + deltaX;
  const maxTranslate = totalSlidesWidth - containerWidth;

  if (maxTranslate < -currentTranslate) {
    return activeIndex;
  }

  let nearestIndex = 0;
  let minDistance = Infinity;

  snapGrid.forEach((snap, index) => {
    const distance = Math.abs(currentTranslate + snap);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}
function getLimitedDeltaX() {
  if (swiperState.value.isBeginning && swiperState.value.deltaX > 0) {
    return swiperState.value.deltaX * 0.25;
  }
  if (swiperState.value.isEnd && swiperState.value.deltaX < 0) {
    return swiperState.value.deltaX * 0.25;
  }
  return swiperState.value.deltaX;
}
function checkBoundaries() {
  let isOverLeft = false;
  let isOverRight = false;

  if (!props.loop) {
    const maxTranslate = swiperState.value.totalSlidesWidth - swiperState.value.containerWidth;
    isOverLeft = swiperState.value.translateX + swiperState.value.deltaX >= 0;
    isOverRight = swiperState.value.translateX + swiperState.value.deltaX <= -maxTranslate;
  }

  swiperState.value.isBeginning = isOverLeft;
  swiperState.value.isEnd = isOverRight;
}
function setSlidesNodes() {
  const defaultNodes = slots?.default?.() as VNode[];
  if (!defaultNodes || defaultNodes.length === 0) throw new Error('Swiper component must have at least one SwiperSlide child');
  const slides: VNode[] = [];
  getSlidesFromSlot(defaultNodes, slides);
  slidesNodes.value = slides;
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
function getModulo(index: number, length: number = slidesNodes.value.length) {
  return ((index % length) + length) % length;
}
function calculationGeneral() {
  if (!wrapperRef.value) return;
  const slidesWidth = Array.from(wrapperRef.value.children).map(el => (el as HTMLElement).offsetWidth);
  const containerWidth = wrapperRef.value.offsetWidth;
  swiperState.value.slidesWidth = slidesWidth;
  swiperState.value.containerWidth = containerWidth;

  let snapGrid: number[] = [];
  let totalWidth = 0;

  slidesWidth.forEach(width => {
    snapGrid.push(totalWidth);
    totalWidth += width + props.spaceBetween;
  });

  totalWidth -= props.spaceBetween;

  if (totalWidth > containerWidth) {
    snapGrid = snapGrid.filter(snap => snap <= totalWidth - containerWidth);
    if (snapGrid[snapGrid.length - 1] < totalWidth - containerWidth) {
      snapGrid.push(totalWidth - containerWidth);
    }
  }

  swiperState.value.snapGrid = snapGrid;
  swiperState.value.totalSlidesWidth = totalWidth;
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

<style lang="postcss" scoped src="./Swiper.style.scss"></style>
