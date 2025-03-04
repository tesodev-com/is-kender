<template>
  <div
    class="swiper"
    :style="swiperStyles"
  >
    <div
      ref="swiperWrapperRef"
      v-swipe="{ onSwipe }"
      class="swiper-wrapper"
      :style="wrapperStyle"
    >
      <component
        :is="slide"
        v-for="(slide, index) in slidesNodes"
        :key="index"
      />
    </div>
  </div>
  <pre>
    {{ swiperState }}
  </pre>
</template>

<script setup lang="ts">
// imports
import { vSwipe, type SwipeState } from '@/directives/vSwipe';
import type { SwiperEmits, SwiperProps, SwiperSlots, SwiperState } from 'library/Swiper';
import { computed, onMounted, onUnmounted, ref, useSlots, useTemplateRef, type VNode } from 'vue';
// interfaces & types

// constants

// composable
const slots = useSlots();
// props
const props = withDefaults(defineProps<SwiperProps>(), {
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  spaceBetween: 0,
  initialSlide: 0,
  allowTouchMove: true,
  threshold: 0.5,
});
defineEmits<SwiperEmits>();
defineSlots<SwiperSlots>();
// defineEmits

// states (refs and reactives)
const wrapperRef = useTemplateRef<HTMLDivElement>('swiperWrapperRef');
const slidesNodes = ref<VNode[]>([]);
const swiperState = ref<SwiperState>({
  // Position and size
  translateX: 0,
  deltaX: 0,
  duration: 0,

  // Indexes
  activeIndex: 0,
  realIndex: 0,

  // State flags
  isBeginning: false,
  isEnd: false,

  // Slide data
  snapGrid: [],
  slidesWidth: [],
  totalSlidesWidth: 0,
  containerWidth: 0,
});
// computed
const swiperStyles = computed(() => {
  return {
    '--slides-per-view': props.slidesPerView === 'auto' ? 1 : props.slidesPerView,
    '--space-between': props.spaceBetween + 'px',
  };
});
const wrapperStyle = computed(() => {
  return {
    transform: `translateX(${swiperState.value.translateX + getLimitedDeltaX()}px)`,
    transitionDuration: `${swiperState.value.duration}ms`,
  };
});
// watchers

// lifecycles
setSlidesNodes();
onMounted(() => {
  calculationGeneral();
  slideTo(props.initialSlide, 0);
  window.addEventListener('resize', onResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
// methods
function onSwipe(event: SwipeState) {
  if (!props.allowTouchMove) return;
  swiperState.value.deltaX = event.deltaX;
  if (event.swipeState === 'move') {
    swiperState.value.activeIndex = findNearestSlideIndex();
  } else if (event.swipeState === 'end') {
    swiperState.value.deltaX = event.deltaX;
    determineTargetSlide(event);
    checkBoundaries();
  }
}
function determineTargetSlide(event: SwipeState) {
  if (event.swipeSpeed > props.threshold) {
    if (event.direction === 'left' && !swiperState.value.isEnd) {
      slideNext();
    } else if (event.direction === 'right' && !swiperState.value.isBeginning) {
      slidePrev();
    } else {
      slideTo(swiperState.value.activeIndex);
    }
  } else {
    slideTo(findNearestSlideIndex());
  }
}
function slidePrev() {
  if (swiperState.value.isBeginning) return;
  const prevIndex = Math.max(swiperState.value.activeIndex - props.slidesPerGroup, 0);
  slideTo(prevIndex);
}
function slideNext() {
  if (swiperState.value.isEnd) return;
  const nextIndex = Math.min(swiperState.value.activeIndex + props.slidesPerGroup, slidesNodes.value.length - 1);
  slideTo(nextIndex);
}
function slideTo(index: number, speed = 300) {
  swiperState.value.activeIndex = index;
  delayedExec(() => {
    const targetTranslate = swiperState.value.snapGrid[index];
    const maxTranslate = Math.min(0, swiperState.value.totalSlidesWidth - swiperState.value.containerWidth);
    swiperState.value.translateX = -Math.max(targetTranslate, maxTranslate);
    swiperState.value.deltaX = 0;
    swiperState.value.duration = speed;
  }, speed).then(() => {
    swiperState.value.duration = 0;
    checkBoundaries();
  });
}
function findNearestSlideIndex() {
  if (swiperState.value.snapGrid.length === 0) return swiperState.value.activeIndex;
  const currentTranslate = swiperState.value.translateX + swiperState.value.deltaX;
  let nearestIndex = 0;
  let minDistance = Infinity;

  swiperState.value.snapGrid.forEach((snap, index) => {
    const distance = Math.abs(currentTranslate + snap);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}
function getLimitedDeltaX(): number {
  if (swiperState.value.isBeginning && swiperState.value.deltaX > 0) {
    return swiperState.value.deltaX * 0.25;
  }
  if (swiperState.value.isEnd && swiperState.value.deltaX < 0) {
    return swiperState.value.deltaX * 0.25;
  }
  return swiperState.value.deltaX;
}
function checkBoundaries() {
  const maxTranslate = swiperState.value.totalSlidesWidth - swiperState.value.containerWidth;
  const isOverLeft = swiperState.value.translateX + swiperState.value.deltaX >= 0;
  const isOverRight = swiperState.value.translateX + swiperState.value.deltaX < -maxTranslate;

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
  nodes.forEach(vnode => {
    if (typeof vnode.type === 'symbol' && vnode.children) {
      getSlidesFromSlot(vnode.children as VNode[], slides);
    } else if (isNamedComponent(vnode.type) && vnode.type?.name === 'SwiperSlide') {
      slides.push(vnode);
    }
  });
  return slides;
}
function calculationGeneral() {
  if (!wrapperRef.value) return;
  const slidesWidth = Array.from(wrapperRef.value.children).map(child => child.clientWidth);
  swiperState.value.containerWidth = wrapperRef.value.clientWidth;
  swiperState.value.slidesWidth = slidesWidth;
  swiperState.value.totalSlidesWidth = slidesWidth.reduce((acc, width) => acc + width, 0);
  swiperState.value.snapGrid = slidesWidth.reduce((acc, _, index) => {
    if (index === 0) {
      acc.push(0);
    } else {
      acc.push(acc[index - 1] + slidesWidth[index - 1] + props.spaceBetween);
    }
    return acc;
  }, [] as number[]);
  checkBoundaries();
}
function delayedExec(callback: () => void, delay = 0) {
  callback();
  return new Promise<void>(resolve =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}
function isNamedComponent(type: any): type is { name: string } {
  return typeof type === 'object' && type !== null && typeof type.name === 'string';
}
function onResize() {
  calculationGeneral();
  slideTo(swiperState.value.activeIndex, 0);
}
</script>

<style lang="scss" scoped src="./Swiper.style.scss"></style>
