import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Skeleton component.
 */
export interface SkeletonProps {
  /**
   * Width of the skeleton element.
   */
  width?: string;

  /**
   * Height of the skeleton element.
   */
  height?: string;

  /**
   * Border radius of the skeleton element.
   */
  borderRadius?: string;

  /**
   * Shape of the skeleton element.
   */
  shape?: 'circle' | 'rectangle';

  /**
   * Animation type for the skeleton effect.
   */
  animation?: 'pulse' | 'wave' | 'none';
}

declare module 'vue' {
  export interface GlobalComponents {
    LibSkeleton: DefineComponent<SkeletonProps>;
  }
}
