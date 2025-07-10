import type { DefineComponent } from '@/@types/core';

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

  /**
   * Function to be called before closing the drawer.
   * If it returns a promise, the drawer will wait for it to resolve.
   * If it returns false or a promise that resolves to false, the drawer will not close.
   */
  beforeClose?: () => boolean | Promise<boolean>;

  /**
   * Whether the drawer should close when the overlay is clicked.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether the drawer should close when the Escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show the overlay.
   * @default true
   */
  hasOverlay?: boolean;

  /**
   * Disables body scrolling when the drawer is open.
   * @default true
   */
  disableBodyScroll?: boolean;
}

export interface DrawerSlots {
  /**
   * Slot for the header content of the drawer.
   */
  header(): any;

  /**
   * Slot for the body content of the drawer.
   */
  body(): any;
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
