import type { DefineComponent } from '@/@types/core';

export type DividerSize = number | string;

/**
 * Props for the Divider component.
 */
export interface DividerProps {
  /**
   * The HTML element to render as.
   */
  is?: string;

  /**
   * The layout direction of the divider.
   */
  layout?: 'horizontal' | 'vertical';

  /**
   * Whether the divider should be fully rounded.
   */
  roundedFull?: boolean;

  /**
   * Custom CSS classes to apply.
   */
  customClass?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibDivider: DefineComponent<DividerProps>;
  }
}
