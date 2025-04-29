import type { DefineComponent } from '@/@types/core';

export type ContainerSize = number | string;

export interface ContainerProps {
  /**
   * Maximum width of the container
   * @default '75rem'
   */
  maxWidth?: string;
  /**
   * Padding on the left and right sides
   * @default '1rem'
   */
  padding?: string;
  /**
   * If true, container will be full width without max-width
   * @default false
   */
  fluid?: boolean;
  /**
   * Optional tag for semantic HTML or styling purposes
   * @default undefined
   */
  tag?: 'main' | 'section' | 'article' | 'div';
}

declare module 'vue' {
  export interface GlobalComponents {
    LibContainer: DefineComponent<ContainerProps>;
  }
}
