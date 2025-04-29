import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Tab component.
 */
export interface TabProps {
  /**
   * Name of the tab.
   */
  name?: string;

  /**
   * Index position of the tab.
   */
  index?: number;

  /**
   * Whether the tab is disabled.
   */
  disabled?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTab: DefineComponent<TabProps>;
  }
}
