import type { SwipeState } from '@/directives/vSwipe';
import { computed } from 'vue';
import { Helpers } from '../core';
import type { EffectOptions } from './types';

function useSlideEffect({ props, state, slideElements, setWrapperStyle, slidePrev, slideNext }: EffectOptions) {
  const currentTranslate = computed(() => {
    return state.value.translateX + getLimitedDeltaX();
  });
  const nearestSlide = computed(() => {
    if (!slideElements.value.length) return 0;
    const { index } = slideElements.value.reduce<{ distance: number; slide: HTMLElement | null; index: number }>(
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
  function init() {
    if (!slideElements.value.length) return;

    const totalSlidesWidth = slideElements.value.reduce((acc, el) => acc + el.offsetWidth + (props.spaceBetween || 0), 0);
    state.value.totalSlidesWidth = totalSlidesWidth;

    if (!props.loop) {
      state.value.lastTranslateX = totalSlidesWidth - state.value.containerWidth - (props.spaceBetween || 0);
      state.value.lastSlideIndex = props.slidesPerView === 'auto' ? slideElements.value.length - 1 : slideElements.value.findIndex(el => el.offsetLeft >= state.value.totalSlidesWidth);
    }

    if (props.initialSlide) {
      slideTo(props.initialSlide, 0);
    } else {
      checkBoundaries();
    }
  }
  function onSwipe(event: SwipeState) {
    if (!props.allowTouchMove) return;
    if (event.swipeState === 'move') onMove(event);
    if (event.swipeState === 'end') onEnd(event);
  }
  function onMove(event: SwipeState) {
    state.value.deltaX = event.deltaX;
    update();
  }
  function onEnd(event: SwipeState) {
    if (event.swipeSpeed >= (props.speed || 0.5)) {
      if (event.direction === 'right') slidePrev();
      if (event.direction === 'left') slideNext();
    } else {
      slideTo(nearestSlide.value);
    }
  }
  function slideTo(index: number, duration: number = 300) {
    const safeIndex = Math.max(0, Math.min(index, state.value.lastSlideIndex));
    if (safeIndex !== state.value.activeIndex) state.value.activeIndex = safeIndex;
    const slideElement = slideElements.value[state.value.activeIndex];
    if (!slideElement) return;
    Helpers.delayedExec(() => {
      state.value.deltaX = 0;
      state.value.translateX = -Math.min(state.value.lastTranslateX, slideElement.offsetLeft);
      state.value.duration = duration;
      update();
    }, duration).then(() => {
      state.value.duration = 0;
      checkBoundaries();
    });
  }
  function update() {
    setWrapperStyle({
      transform: `translateX(${currentTranslate.value}px)`,
      transitionDuration: `${state.value.duration}ms`,
    });
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

  return {
    init,
    onSwipe,
    slideTo,
  };
}

export default useSlideEffect;
