import type { SwipeState } from '@/directives/vSwipe';
import type { ComputedRef, Ref } from 'vue';
import type { SwiperProps, SwiperState } from '../Swiper';

export interface EffectOptions {
  props: SwiperProps;
  state: Ref<SwiperState>;
  slideElements: ComputedRef<HTMLElement[]>;
  setWrapperStyle: (style: Partial<CSSStyleDeclaration>) => void;
  slideNext: (offset?: number) => void;
  slidePrev: (offset?: number) => void;
}

export interface EffectReturnType {
  init: () => void;
  onSwipe: (event: SwipeState) => void;
  slideTo: (index: number, duration?: number) => void;
}
