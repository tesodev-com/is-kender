import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Text component.
 */
export interface TextProps {
  /**
   * HTML tag used for the text element.
   */
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

  /**
   * Font size of the text.
   */
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Font weight of the text.
   */
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /**
   * Font color of the text.
   */
  fontColor?: 'black' | 'white' | 'gray' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

  /**
   * Custom CSS classes to apply.
   */
  customClass?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibText: DefineComponent<TextProps>;
  }
}
