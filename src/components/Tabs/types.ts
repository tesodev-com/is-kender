import type { DefineComponent } from '@/@types/core';
import { type Ref } from 'vue';

/**
 * Props for the Tabs component.
 */
export interface TabsProps {
  /**
   * Title displayed above the tabs.
   */
  title?: string;
}

/**
 * Context object for managing tab state.
 */
export interface TabsContext {
  /**
   * Currently active tab index.
   */
  activeTab: Ref<number>;

  /**
   * Function to set the active tab by index.
   */
  setActiveTab: (index: number) => void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTabs: DefineComponent<TabsProps>;
  }
}
