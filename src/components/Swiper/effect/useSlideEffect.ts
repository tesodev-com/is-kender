import type { SwipeState } from '@/directives/vSwipe';
import type { SwiperProps } from 'library/Swiper';
import { Helpers, initialProps, state } from 'library/Swiper/core';
import { computed, onMounted, type ComputedRef } from 'vue';

interface UseSlideEffect {
  props: SwiperProps;
  renderedSlideElements: ComputedRef<HTMLElement[]>;
  updateSlideClasses: (activeIndex?: number) => void;
}

export function useSlideEffect({ props, renderedSlideElements, updateSlideClasses }: UseSlideEffect) {
  // constants
  // composable
  // states (refs and reactives)
  // computed
  const wrapperStyles = computed(() => ({
    transform: `translateX(${currentTranslate.value}px)`,
    transitionDuration: `${state.value.duration}ms`,
  }));
  const currentTranslate = computed(() => {
    return state.value.translateX + getLimitedDeltaX();
  });
  const nearestSlide = computed(() => {
    if (!renderedSlideElements.value.length) return 0;
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
  // lifecycles
  onMounted(() => {
    slideTo(props.initialSlide || initialProps.initialSlide);
  });
  // methods
  function onSwipe(event: SwipeState) {
    if (!props.allowTouchMove) return;
    if (event.swipeState === 'move') onMove(event);
    if (event.swipeState === 'end') onEnd(event);
  }
  function onMove(event: SwipeState) {
    state.value.deltaX = event.deltaX;
    updateSlideClasses(nearestSlide.value);
  }
  function onEnd(event: SwipeState) {
    if (event.swipeSpeed >= (props.speed || initialProps.speed)) {
      if (event.direction === 'right') slidePrev();
      if (event.direction === 'left') slideNext();
    } else {
      slideTo(nearestSlide.value);
    }
  }
  function slideTo(index: number, duration: number = 300) {
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
  function slidePrev(offset = props.slidesPerGroup || initialProps.slidesPerGroup) {
    const prevIndex = state.value.activeIndex - offset;
    if (props.rewind) {
      slideTo(state.value.isBeginning ? state.value.lastSlideIndex : prevIndex);
    } else {
      slideTo(prevIndex);
    }
  }
  function slideNext(offset = props.slidesPerGroup || initialProps.slidesPerGroup) {
    const nextIndex = state.value.activeIndex + offset;
    if (props.rewind) {
      slideTo(state.value.isEnd ? 0 : nextIndex);
    } else {
      slideTo(nextIndex);
    }
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
  function getLimitedDeltaX() {
    let limitedDeltaX = state.value.deltaX;
    if (!props.loop && ((state.value.isBeginning && state.value.deltaX > 0) || (state.value.isEnd && state.value.deltaX < 0))) {
      limitedDeltaX *= 0.25;
    }
    return limitedDeltaX;
  }

  return {
    onSwipe,
    slidePrev,
    slideNext,
    slideTo,
    wrapperStyles,
  };
}
