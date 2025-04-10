import type { SwipeState } from '@/directives/vSwipe';
import { computed, ref } from 'vue';
import { Helpers } from '../core';
import type { EffectOptions, SlideToOptions } from './types';

interface EffectState {
  translateX: number;
  fixX: number;
  lastTranslateX: number;
  totalSlidesWidth: number;
}

function useSlideEffect({ props, state, slideElements, setWrapperStyle, updateSlideClass, slidePrev, slideNext }: EffectOptions) {
  const effectState = ref<EffectState>({
    translateX: 0,
    fixX: 0,
    lastTranslateX: 0,
    totalSlidesWidth: 0,
  });
  const currentTranslate = computed(() => {
    return effectState.value.translateX + getLimitedDeltaX() + effectState.value.fixX;
  });
  const nearestSlide = computed(() => {
    if (!slideElements.value.length) return null;
    const { slide } = slideElements.value.reduce<{ distance: number; slide: HTMLElement | null; index: number }>(
      (acc, el, index) => {
        const distance = Math.abs(el.offsetLeft - -currentTranslate.value);
        if (distance < acc.distance) {
          return { distance, slide: el, index };
        }
        return acc;
      },
      { distance: Infinity, slide: null, index: 0 }
    );
    return slide;
  });
  function init() {
    if (!slideElements.value.length) return;

    const totalSlidesWidth = slideElements.value.reduce((acc, el) => acc + el.offsetWidth + (props.spaceBetween || 0), 0);
    effectState.value.totalSlidesWidth = totalSlidesWidth;
    effectState.value.lastTranslateX = totalSlidesWidth - state.value.containerWidth - (props.spaceBetween || 0);

    if (!props.loop) {
      state.value.lastSlideIndex = slideElements.value.findIndex(el => el.offsetLeft >= effectState.value.lastTranslateX);
    } else {
      state.value.lastSlideIndex = slideElements.value.length - 1;
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
      slideTo({ slide: nearestSlide.value });
    }
  }
  function slideTo({ slide, index, duration = props.animationDuration || 500 }: SlideToOptions) {
    let slideElement = null;
    if (slide) {
      slideElement = slide;
    } else if (typeof index === 'number' && !isNaN(index)) {
      slideElement = slideElements.value[Helpers.getModulo(index, slideElements.value.length)];
    } else {
      slideElement = slideElements.value[Helpers.getModulo(state.value.activeIndex, slideElements.value.length)];
    }
    const slideIndex = Helpers.getSlideIndex(slideElement);
    Helpers.delayedExec(() => {
      state.value.deltaX = 0;
      effectState.value.translateX = -Math.min(effectState.value.lastTranslateX, slideElement?.offsetLeft);
      state.value.duration = duration;
      update();
    }, duration).then(() => {
      state.value.duration = 0;
      if (slideIndex !== state.value.activeIndex) state.value.activeIndex = slideIndex;
      checkBoundaries();
      update();
    });
  }
  function update() {
    setWrapperStyle({
      transform: `translateX(${currentTranslate.value}px)`,
      transitionDuration: `${state.value.duration}ms`,
    });
    updateSlideClass(Helpers.getSlideIndex(nearestSlide.value));
  }
  function getLimitedDeltaX() {
    let limitedDeltaX = state.value.deltaX;
    if (!props.loop && ((state.value.isBeginning && state.value.deltaX > 0) || (state.value.isEnd && state.value.deltaX < 0))) {
      limitedDeltaX *= 0.25;
    }
    return limitedDeltaX;
  }
  function checkBoundaries() {
    state.value.isBeginning = -currentTranslate.value <= 0;
    state.value.isEnd = -currentTranslate.value >= effectState.value.lastTranslateX;
  }

  return {
    init,
    onSwipe,
    slideTo,
    effectState,
  };
}

export default useSlideEffect;
