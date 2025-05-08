import type { DefineComponent } from '@/@types/core';
import type { Ref } from 'vue';

/**
 * Props for the TabsList component.
 */

export type IndicatorMode = 'static' | 'sliding';
export type TabSize = 'sm' | 'md';

export type TabsTheme = 'line' | 'button' | 'segmented' | 'segmented-minimal';
export type TabsThemeColor = 'primary' | 'gray';

export interface TabsListContext {
  indicatorMode: Ref<IndicatorMode>;
  tabsSize: Ref<TabSize>;
  fluid: Ref<boolean>;
  theme?: TabsTheme;
  themeColor?: TabsThemeColor;
}

export interface TabsListProps {
  /**
   * Custom class for the tabs list
   */
  customClass?: string;

  /**
   * When true, child tab buttons will be distributed equally across the full width
   * @default false
   */
  fluid?: boolean;

  /**
   * Indicator's mode
   * @default 'static'
   */
  indicatorMode?: IndicatorMode;

  /**
   * Indicator's thickness (px)
   * @default 2
   */
  indicatorThickness?: number;

  /**
   * Indicator's color
   * @default undefined
   */
  indicatorColor?: string;

  /**
   * Tab button size
   * @default 'sm'
   */
  tabsSize?: TabSize;

  /**
   * Tabs theme
   * @default 'line'
   */
  theme?: TabsTheme;

  /**
   * Tabs theme color
   * @default 'primary'
   */
  themeColor?: TabsThemeColor;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTabsList: DefineComponent<TabsListProps>;
  }
}
