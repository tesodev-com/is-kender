import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Alert component.
 */
export interface AlertProps {
  /** The color style of the alert. Optional. */
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

  /** The visual style variant of the alert. Optional. */
  variant?: 'solid' | 'outline';

  /** Whether the alert should take the full width of its container. Optional. */
  fluid?: boolean;

  /** Whether the alert can be closed by the user. Optional. */
  closable?: boolean;

  /** Time in milliseconds before the alert automatically closes. Optional. */
  life?: number;

  /** The title of the alert. Optional. */
  title?: string;

  /** The main text content of the alert. Optional. */
  text?: string;
}

/**
 * Slots available in the Alert component.
 */
export interface AlertSlots {
  /** Slot for a custom icon. */
  icon: any;

  /** Slot for a custom title. */
  title: any;

  /** Slot for custom text content. */
  text: any;
}

/**
 * Events emitted by the Alert component.
 */
export interface AlertEmits {
  /** Emitted when the alert is closed. */
  (e: 'close'): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibAlert: DefineComponent<AlertProps, AlertSlots, AlertEmits>;
  }
}
