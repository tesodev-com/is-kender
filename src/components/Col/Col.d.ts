import { type DefineComponent } from 'vue';

export type ColSize = number | string;

export interface ColProps {
  /**
   * Number of columns to span
   * @default ''
   */
  cols?: ColSize;
  /**
   * Number of columns to span from small breakpoint and up (≥576px)
   * @default ''
   */
  sm?: ColSize;
  /**
   * Number of columns to span from medium breakpoint and up (≥768px)
   * @default ''
   */
  md?: ColSize;
  /**
   * Number of columns to span from large breakpoint and up (≥992px)
   * @default ''
   */
  lg?: ColSize;
  /**
   * Number of columns to span from extra large breakpoint and up (≥1200px)
   * @default ''
   */
  xl?: ColSize;
  /**
   * Number of columns to span from extra extra large breakpoint and up (≥1400px)
   * @default ''
   */
  xxl?: ColSize;
}

declare const Col: DefineComponent<ColProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibCol: typeof Col;
  }
}

export default Col;
