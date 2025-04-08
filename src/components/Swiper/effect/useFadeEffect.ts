import type { SwipeState } from '@/directives/vSwipe';
import { ref } from 'vue';
import { Helpers } from '../core';
import type { EffectOptions, SlideToOptions } from './types';

interface EffectState {
  opacityArray: number[];
}

function useFadeEffect({ props, state, slideElements, updateSlideClass, slidePrev, slideNext }: EffectOptions) {
  const effectState = ref<EffectState>({
    opacityArray: Array.from({ length: slideElements.value.length }).map((_, index) => (index === state.value.activeIndex ? 1 : 0)),
  });
  const transitionRatio = 0.5;
  function init() {
    if (!slideElements.value.length) return;
    state.value.lastSlideIndex = slideElements.value.length - 1;
    checkBoundaries();
    update();
  }
  function onSwipe(event: SwipeState) {
    if (!props.allowTouchMove) return;
    if (event.swipeState === 'move') onMove(event);
    if (event.swipeState === 'end') onEnd(event);
  }
  function onMove(event: SwipeState) {
    const ratio = Math.abs(getLimitedDeltaX(event.deltaX) / (state.value.containerWidth * 0.5));
    const activeIndex = state.value.activeIndex;
    let newIndex = activeIndex;
    effectState.value.opacityArray[activeIndex] = 1 - ratio;
    if (event.direction === 'left') {
      newIndex = props.loop ? Helpers.getModulo(activeIndex + 1, slideElements.value.length) : activeIndex + 1;
    } else {
      newIndex = props.loop ? Helpers.getModulo(activeIndex - 1, slideElements.value.length) : activeIndex - 1;
    }
    updateSlideClass(Math.abs(effectState.value.opacityArray[newIndex]) > transitionRatio ? newIndex : activeIndex);
    effectState.value.opacityArray[newIndex] = ratio;
    update();
  }
  function onEnd(event: SwipeState) {
    if (event.swipeSpeed >= (props.speed || 0.5)) {
      if (event.direction === 'right') slidePrev();
      if (event.direction === 'left') slideNext();
    } else {
      const currentOpacity = effectState.value.opacityArray[state.value.activeIndex];
      if (Math.abs(currentOpacity) < transitionRatio) {
        if (event.direction === 'right') slidePrev();
        if (event.direction === 'left') slideNext();
      } else {
        slideTo({ index: state.value.activeIndex });
      }
    }
  }
  function slideTo({ slide, index, duration }: SlideToOptions) {
    let slideElement = null;
    if (slide) {
      slideElement = slide;
    } else if (typeof index === 'number' && !isNaN(index)) {
      slideElement = slideElements.value[Helpers.getModulo(index, slideElements.value.length)];
    } else {
      slideElement = slideElements.value[Helpers.getModulo(state.value.activeIndex, slideElements.value.length)];
    }
    const slideIndex = Helpers.getSlideIndex(slideElement);
    if (slideIndex !== state.value.activeIndex) state.value.activeIndex = slideIndex;
    effectState.value.opacityArray = effectState.value.opacityArray.map((_, i) => (i === state.value.activeIndex ? 1 : 0));
    Helpers.delayedExec(() => {
      slideElements.value.forEach((slideElement, i) => {
        if (!slideElement) return;
        slideElement.style.opacity = effectState.value.opacityArray[i].toString();
        slideElement.style.transitionDuration = `${duration}ms`;
      });
      updateSlideClass();
    }, duration).then(() => {
      slideElements.value.forEach(slideElement => {
        if (!slideElement) return;
        slideElement.style.transitionDuration = '0ms';
      });
      checkBoundaries();
    });
  }
  function update() {
    slideElements.value.forEach((slideElement, index) => {
      if (!slideElement) return;
      slideElement.style.opacity = effectState.value.opacityArray[index].toString();
    });
  }
  function getLimitedDeltaX(deltaX: number) {
    let limitedDeltaX = deltaX;
    if (!props.loop && ((state.value.isBeginning && deltaX > 0) || (state.value.isEnd && deltaX < 0))) {
      limitedDeltaX *= 0.25;
    }
    return limitedDeltaX;
  }
  function checkBoundaries() {
    let isOverLeft = state.value.activeIndex === 0;
    let isOverRight = state.value.activeIndex === slideElements.value.length - 1;

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

export default useFadeEffect;
