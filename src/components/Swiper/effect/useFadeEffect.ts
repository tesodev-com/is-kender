import type { SwipeState } from '@/directives/vSwipe';
import { ref } from 'vue';
import { Helpers } from '../core';
import type { EffectOptions } from './types';

function useFadeEffect({ props, state, slideElements, updateSlideClass, slidePrev, slideNext }: EffectOptions) {
  const opacityArray = ref<number[]>(Array.from({ length: slideElements.value.length }).map((_, index) => (index === state.value.activeIndex ? 1 : 0)));
  const transitionRatio = 0.5;
  function init() {
    if (!slideElements.value.length) return;
    if (props.initialSlide) {
      slideTo(props.initialSlide, 0);
    } else {
      checkBoundaries();
    }
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
    if (event.direction === 'left') {
      opacityArray.value[activeIndex] = 1 - ratio;
      opacityArray.value[activeIndex + 1] = ratio;
      updateSlideClass(Math.abs(opacityArray.value[activeIndex + 1]) > transitionRatio ? activeIndex + 1 : activeIndex);
    } else {
      opacityArray.value[activeIndex] = 1 - ratio;
      opacityArray.value[activeIndex - 1] = ratio;
      updateSlideClass(Math.abs(opacityArray.value[activeIndex - 1]) > transitionRatio ? activeIndex - 1 : activeIndex);
    }
    update();
  }
  function onEnd(event: SwipeState) {
    if (event.swipeSpeed >= (props.speed || 0.5)) {
      if (event.direction === 'right') slidePrev();
      if (event.direction === 'left') slideNext();
    } else {
      const currentOpacity = opacityArray.value[state.value.activeIndex];
      if (Math.abs(currentOpacity) < transitionRatio) {
        if (event.direction === 'right') slidePrev();
        if (event.direction === 'left') slideNext();
      } else {
        slideTo(state.value.activeIndex);
      }
    }
  }
  function slideTo(index: number, duration: number = 500) {
    const safeIndex = Math.max(0, Math.min(index, slideElements.value.length - 1));
    if (safeIndex !== state.value.activeIndex) state.value.activeIndex = safeIndex;
    opacityArray.value = opacityArray.value.map((_, i) => (i === safeIndex ? 1 : 0));
    Helpers.delayedExec(() => {
      slideElements.value.forEach((slideElement, i) => {
        if (!slideElement) return;
        slideElement.style.opacity = opacityArray.value[i].toString();
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
      slideElement.style.opacity = opacityArray.value[index].toString();
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
