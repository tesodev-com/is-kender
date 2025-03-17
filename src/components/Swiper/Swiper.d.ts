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

  // Autoplay
  autoplay?: boolean;
  autoplayDelay?: number;

  // Navigation controls
  navigation?: boolean;
  pagination?: boolean;

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
}

export interface SwiperState {
  // ID
  swiperId: string;

  // Position and size
  translateX: number;
  deltaX: number;
  duration: number;

  // Indexes
  activeIndex: number;
  previousIndex: number;

  // State flags
  isBeginning: boolean;
  isEnd: boolean;

  // Slide data
  totalSlidesWidth: number;
  containerWidth: number;
  lastTranslateX: number; // If loop is disabled and last slide is completely visible
  lastSlideIndex: number; // If loop is disabled and last slide is completely visible
}

declare const Swiper: DefineComponent<SwiperProps, SwiperSlots, SwiperEmits>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSwiper: typeof Swiper;
  }
}

export default Swiper;
