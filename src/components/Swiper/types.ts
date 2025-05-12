import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Swiper component.
 */
export interface SwiperProps {
  /**
   * Number of slides visible at the same time.
   */
  slidesPerView?: number | 'auto';

  /**
   * Number of slides to group together during navigation.
   */
  slidesPerGroup?: number;

  /**
   * Space in pixels between slides.
   */
  spaceBetween?: number;

  /**
   * Index of the initial slide.
   */
  initialSlide?: number;

  /**
   * Transition speed in milliseconds.
   */
  speed?: number;

  /**
   * Transition effect between slides.
   */
  effect?: 'slide' | 'fade';

  /**
   * Duration of animation effects in milliseconds.
   */
  animationDuration?: number;

  /**
   * Whether slides should autoplay.
   */
  autoplay?: boolean;

  /**
   * Delay between autoplay transitions in milliseconds.
   */
  autoplayDelay?: number;

  /**
   * Whether navigation buttons are enabled.
   */
  navigation?: boolean;

  /**
   * Whether pagination indicators are enabled.
   */
  pagination?: boolean;

  /**
   * Whether to display a fraction pagination.
   */
  fraction?: boolean;

  /**
   * Whether slides should loop continuously.
   */
  loop?: boolean;

  /**
   * Whether slides should rewind to the first after reaching the end.
   */
  rewind?: boolean;

  /**
   * Whether touch gestures are allowed.
   */
  allowTouchMove?: boolean;
}

/**
 * Event callbacks for the Swiper component.
 */
export interface SwiperEmits {
  /**
   * Triggered when the active slide changes.
   * @param index The new active slide index.
   */
  (e: 'slideChange', index: number): void;

  /**
   * Triggered when the first slide is reached.
   */
  (e: 'reachBeginning'): void;

  /**
   * Triggered when the last slide is reached.
   */
  (e: 'reachEnd'): void;
}

/**
 * Slots available for the Swiper component.
 */
export interface SwiperSlots {
  /**
   * Default slot for swiper slides.
   */
  default(): any;

  /**
   * Slot for the previous navigation button.
   */
  'navigation-prev'?(): any;

  /**
   * Slot for the next navigation button.
   */
  'navigation-next'?(): any;
}

/**
 * State object for the Swiper component.
 */
export interface SwiperState {
  /**
   * Unique identifier for the swiper instance.
   */
  swiperId: string;

  /**
   * Movement distance along the X-axis.
   */
  deltaX: number;

  /**
   * Duration of the current transition in milliseconds.
   */
  duration: number;

  /**
   * Current active slide index.
   */
  activeIndex: number;

  /**
   * Whether the swiper is at the beginning.
   */
  isBeginning: boolean;

  /**
   * Whether the swiper is at the end.
   */
  isEnd: boolean;

  /**
   * Width of the swiper container.
   */
  containerWidth: number;

  /**
   * Index of the last slide.
   */
  lastSlideIndex: number;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibSwiper: DefineComponent<SwiperProps, SwiperSlots, SwiperEmits>;
  }
}
