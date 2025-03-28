import type { SwipeState } from '@/directives/vSwipe';
import type { ComputedRef, Ref, VNode } from 'vue';
import type { SwiperProps, SwiperState } from '../types';

export interface SlideToOptions {
  slide?: HTMLElement | null;
  index?: number;
  duration?: number;
}
export interface EffectOptions {
  props: SwiperProps;
  state: Ref<SwiperState>;
  originalSlides: Ref<VNode[]>;
  renderToSlides: Ref<VNode[]>;
  slideElements: ComputedRef<HTMLElement[]>;
  setWrapperStyle: (style: Partial<CSSStyleDeclaration>) => void;
  updateSlideClass: (index?: number) => void;
  slideNext: (offset?: number) => void;
  slidePrev: (offset?: number) => void;
}

export interface EffectReturnType {
  init: () => void;
  onSwipe: (event: SwipeState) => void;
  slideTo: (opts: SlideToOptions) => void;
  effectState?: Ref<Record<string, any>>;
}
