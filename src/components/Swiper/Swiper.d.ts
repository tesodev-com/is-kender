import { type DefineComponent } from 'vue';

// Type definition for Swiper props
export interface SwiperProps {
  // Basic configuration
  slidesPerView?: number | 'auto';
  slidesPerGroup?: number;
  spaceBetween?: number;
  initialSlide?: number;

  // Behavior settings
  speed?: number;
  effect?: 'slide' | 'fade';
  animationDuration?: number;

  // Autoplay
  autoplay?: boolean;
  autoplayDelay?: number;

  // Controls
  navigation?: boolean;
  pagination?: boolean;
  fraction?: boolean;

  // Loop and boundary behavior
  loop?: boolean;
  rewind?: boolean;
  allowTouchMove?: boolean;
}

export interface SwiperEmits {
  (e: 'slideChange', index: number): void;
  (e: 'reachBeginning'): void;
  (e: 'reachEnd'): void;
}

export interface SwiperSlots {
  default(): any;
  'navigation-prev'(): any;
  'navigation-next'(): any;
}

export interface SwiperState {
  // ID
  swiperId: string;

  // Position and size
  deltaX: number;
  duration: number;

  // Indexes
  activeIndex: number;

  // State flags
  isBeginning: boolean;
  isEnd: boolean;

  // Slide data
  containerWidth: number;
  lastSlideIndex: number;
}

declare const Swiper: DefineComponent<SwiperProps, SwiperSlots, SwiperEmits>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSwiper: typeof Swiper;
  }
}

export default Swiper;
