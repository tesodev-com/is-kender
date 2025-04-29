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
  size?: '25%' | '50%' | '100%';

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

/**
 * Type representing a toggle state.
 */
export type ToggleValue = boolean;

declare module 'vue' {
  export interface GlobalComponents {
    LibDrawer: DefineComponent<DrawerProps>;
  }
}
