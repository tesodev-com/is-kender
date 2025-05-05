import type { DefineComponent } from '@/@types/core';

/**
 * Props for a single toast message.
 */
export interface ToastMessageProps {
  /**
   * Visual style of the toast component
   * @default "solid"
   */
  variant?: 'solid' | 'outline';

  /**
   * Color scheme of the toast
   * @default "primary"
   */
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

  /**
   * Title text displayed at the top of the toast
   */
  title?: string;

  /**
   * Main message content of the toast
   */
  message?: string;

  /**
   * Duration in milliseconds before the toast automatically dismisses
   */
  life?: number;
}

/**
 * Props for the Toast container component.
 */
export interface ToastProps {
  /**
   * Position of the toast container on the screen.
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Animation type for toast appearance.
   */
  animation?: 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down';

  /**
   * Whether to display toast messages in reverse order.
   */
  listReverse?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibToast: DefineComponent<ToastProps>;
  }
}
