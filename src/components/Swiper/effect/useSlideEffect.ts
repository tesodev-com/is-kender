import type { SwipeState } from '@/directives/vSwipe';
import { computed, ref } from 'vue';
import { Helpers } from '../core';
import type { EffectOptions } from './types';

interface EffectState {
  translateX: number;
  lastTranslateX: number;
  totalSlidesWidth: number;
}

function useSlideEffect({ props, state, slideElements, setWrapperStyle, updateSlideClass, slidePrev, slideNext }: EffectOptions) {
  const effectState = ref<EffectState>({
    translateX: -slideElements.value[state.value.activeIndex].offsetLeft,
    lastTranslateX: 0,
    totalSlidesWidth: 0,
  });
  const currentTranslate = computed(() => {
    return effectState.value.translateX + getLimitedDeltaX();
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
    effectState.value.totalSlidesWidth = totalSlidesWidth;

    if (!props.loop) {
      effectState.value.lastTranslateX = totalSlidesWidth - state.value.containerWidth - (props.spaceBetween || 0);
      state.value.lastSlideIndex = slideElements.value.findIndex(el => el.offsetLeft >= effectState.value.lastTranslateX);
    }

    update();
    checkBoundaries();
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
  function slideTo(index: number, duration: number = props.animationDuration || 500) {
    const safeIndex = Math.max(0, Math.min(index, state.value.lastSlideIndex));
    const slideElement = slideElements.value[safeIndex];
    if (!slideElement) return;
    Helpers.delayedExec(() => {
      state.value.deltaX = 0;
      effectState.value.translateX = -Math.min(effectState.value.lastTranslateX, slideElement.offsetLeft);
      state.value.duration = duration;
      update();
    }, duration).then(() => {
      state.value.duration = 0;
      if (safeIndex !== state.value.activeIndex) state.value.activeIndex = safeIndex;
      checkBoundaries();
    });
  }
  function update() {
    setWrapperStyle({
      transform: `translateX(${currentTranslate.value}px)`,
      transitionDuration: `${state.value.duration}ms`,
    });
    updateSlideClass(nearestSlide.value);
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
    let isOverRight = -currentTranslate.value >= effectState.value.lastTranslateX - offset;

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
