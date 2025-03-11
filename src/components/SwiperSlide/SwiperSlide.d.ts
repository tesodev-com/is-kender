/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type DefineComponent } from 'vue';

export interface SwiperSlideProps {}

declare const SwiperSlide: DefineComponent<SwiperSlideProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSwiperSlide: typeof SwiperSlide;
  }
}

export default SwiperSlide;
