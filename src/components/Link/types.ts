import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Link component.
 */
export interface LinkProps {
  /**
   * The URL or route the link points to.
   */
  to?: string;

  /**
   * Whether to use the router for navigation.
   */
  useRouter?: boolean;

  /**
   * Whether the link is an external URL.
   */
  isExternal?: boolean;

  /**
   * The rel attribute for the link.
   */
  rel?: string;

  /**
   * The target attribute for the link.
   */
  target?: string;

  /**
   * The title attribute for the link.
   */
  title?: string;

  /**
   * Whether the link text is underlined.
   */
  underline?: boolean;

  /**
   * Whether the link is disabled.
   */
  disabled?: boolean;

  /**
   * Font size of the link text.
   */
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Font weight of the link text.
   */
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /**
   * Font color of the link text.
   */
  fontColor?: 'black' | 'white' | 'gray' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
}

declare module 'vue' {
  export interface GlobalComponents {
    LibLink: DefineComponent<LinkProps>;
  }
}
