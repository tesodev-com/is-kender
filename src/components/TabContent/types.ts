import type { DefineComponent } from '@/@types/core';

/**
 * Props for the TabContent component.
 */

export interface TabContentProps {
  /**
   * Value that matches with the tab
   * @default ''
   */
  value: string;

  /**
   * Custom class for the tab content
   * @default ''
   */
  customClass?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTabContent: DefineComponent<TabContentProps>;
  }
}
