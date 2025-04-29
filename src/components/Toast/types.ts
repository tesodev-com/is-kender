import type { DefineComponent } from '@/@types/core';

/**
 * Props for a single toast message.
 */
export interface ToastMessageProps {
  /**
   * Style variant of the toast message.
   */
  variant?: 'solid' | 'outline';

  /**
   * Color theme of the toast message.
   */
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

  /**
   * Title text displayed in the toast.
   */
  title?: string;

  /**
   * Body message text displayed in the toast.
   */
  message?: string;

  /**
   * Lifetime of the toast message in milliseconds.
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
