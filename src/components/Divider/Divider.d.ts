import { type DefineComponent } from 'vue';

export type DividerSize = number | string;

export interface DividerProps {
  is?: string;
  layout?: 'horizontal' | 'vertical';
  roundedFull?: boolean;
  customClass?: string;
}

declare const Divider: DefineComponent<DividerProps>;

declare module 'vue' {
  export interface GlobalComponents {
    Divider: typeof Divider;
  }
}

export default Divider;
