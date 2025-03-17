import type { SwipeState } from '@/directives/vSwipe';
import type { SwiperProps } from 'library/Swiper';
import { Helpers, state } from 'library/Swiper/core';
import { computed, ref, type ComputedRef } from 'vue';

interface UseFadeEffect {
  props: SwiperProps;
  renderedSlideElements: ComputedRef<HTMLElement[]>;
  updateSlideClasses: (activeIndex?: number) => void;
}

export function useFadeEffect({ props, renderedSlideElements, updateSlideClasses }: UseFadeEffect) {
  // constants
  // states (refs and reactives)
  const opacities = ref<number[]>([]);
  // computed
  const wrapperStyles = computed(() => ({}));
  // watchers
  // lifecycles
  // methods
  function onSwipe(event: SwipeState) {
    if (!props.allowTouchMove) return;
    if (event.swipeState === 'move') onMove(event);
    if (event.swipeState === 'end') onEnd();
  }
  function slideTo(index: number, duration: number = 300) {
    Helpers.delayedExec(() => {}, duration).then(() => {
      updateSlideClasses(index);
    });
  }
  function onMove(event: SwipeState) {
    state.value.deltaX = event.deltaX;
    updateSlideClasses();
  }
  function onEnd() {}
  function slidePrev() {}
  function slideNext() {}

  return {
    onSwipe,
    slideTo,
    slidePrev,
    slideNext,
    wrapperStyles,
  };
}
