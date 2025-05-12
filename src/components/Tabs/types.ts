import type { DefineComponent } from '@/@types/core';
import type { Ref } from 'vue';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsDirection = 'before' | 'after';

/**
 * Props for the Tabs component.
 */
export interface TabsProps {
  /**
   * Default selected tab value (uncontrolled mode)
   * @default undefined
   */
  defaultValue?: string;

  /**
   * Called when tab selection changes
   */
  onValueChange?: (value: string | undefined) => void;

  /**
   * Tabs orientation
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;

  /**
   * Tab's direction
   * @default 'after'
   */
  tabsDirection?: TabsDirection;

  /**
   * Custom class for the tabs
   */
  customClass?: string;
}

export interface TabsContext {
  selectedTab: Ref<string | undefined>;
  setSelectedTab?: (value: string | undefined) => void;
  orientation?: TabsOrientation;
  tabsDirection?: TabsDirection;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTabs: DefineComponent<TabsProps>;
  }
}
