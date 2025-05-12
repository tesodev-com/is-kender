import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Svg component.
 */
export interface SvgProps {
  /**
   * Source URL or path for the SVG file.
   */
  src?: string;

  /**
   * Name of the SVG icon.
   */
  name?: string;

  /**
   * Size of the SVG.
   */
  size?: string;

  /**
   * Inline styles applied to the SVG.
   */
  style?: string;

  /**
   * Whether to preserve the original color of the SVG.
   */
  preserveColor?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibSvg: DefineComponent<SvgProps>;
  }
}
