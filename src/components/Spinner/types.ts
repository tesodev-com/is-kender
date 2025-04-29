import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps {
  /**
   * Size of the spinner.
   */
  size?: string;

  /**
   * Whether the spinner should take up the full width of its container.
   */
  fluid?: boolean;

  /**
   * Color of the spinner.
   */
  color?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibSpinner: DefineComponent<SpinnerProps>;
  }
}
