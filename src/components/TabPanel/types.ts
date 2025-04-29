import type { DefineComponent } from '@/@types/core';

/**
 * Props for the TabPanel component.
 */
export interface TabPanelProps {
  /**
   * Name of the tab panel.
   */
  name: string;

  /**
   * Index position of the tab panel.
   */
  index?: number;

  /**
   * Role attribute for accessibility.
   */
  role?: string;

  /**
   * Whether the tab panel is disabled.
   */
  disabled?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTabPanel: DefineComponent<TabPanelProps>;
  }
}
