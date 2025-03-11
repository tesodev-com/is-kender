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

  // Autoplay
  autoplay?: boolean;
  autoplayDelay?: number;

  // Navigation controls
  navigation?: boolean;
  pagination?: boolean;

  // Loop and boundary behavior
  loop?: boolean;
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
  // Position and size
  translateX: number;
  deltaX: number;
  duration: number;

  // Indexes
  activeIndex: number;

  // State flags
  isBeginning: boolean;
  isEnd: boolean;

  // Slide data
  snapGrid: number[];
  slidesWidth: number[];
  totalSlidesWidth: number;
  containerWidth: number;
}

declare const Swiper: DefineComponent<SwiperProps, SwiperSlots, SwiperEmits>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSwiper: typeof Swiper;
  }
}

export default Swiper;
