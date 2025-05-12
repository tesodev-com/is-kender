import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Tab component.
 */
export interface TabProps {
  /**
   * Unique value for the tab
   * @default ''
   */
  value: string;
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom class for the tab
   * @default ''
   */
  customClass?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTab: DefineComponent<TabProps>;
  }
}
