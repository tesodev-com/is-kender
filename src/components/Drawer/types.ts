import type { DefineComponent } from '@/@types/core';
import type { VNode } from 'vue';

/**
 * Props for the Drawer component.
 */
export interface DrawerProps {
  /**
   * The position where the drawer appears from.
   */
  position?: 'left' | 'right' | 'up' | 'down';

  /**
   * The size of the drawer.
   */
  size?: string;

  /**
   * The title displayed in the drawer header.
   */
  title?: string;

  /**
   * Whether the drawer has a header.
   */
  hasHeader?: boolean;

  /**
   * Whether the drawer has a close button.
   */
  hasCloseButton?: boolean;
}

export interface DrawerSlots {
  default: () => VNode;
}

export interface DrawerEmits {
  /**
   * Event emitted when the drawer is closed.
   */
  (e: 'close'): void;
}

/**
 * Type representing a toggle state.
 */
export type ToggleValue = boolean;

declare module 'vue' {
  export interface GlobalComponents {
    LibDrawer: DefineComponent<DrawerProps, DrawerSlots, DrawerEmits>;
  }
}
