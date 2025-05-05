import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Button component.
 */
export interface ButtonProps {
  /** Allows passing any additional custom props. */
  [key: string]: any;

  /** The HTML element to render (e.g., 'button', 'a'). Optional. */
  el?: 'button' | 'a' | any;

  /** Size of the button. Optional. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /** Color theme of the button. Optional. */
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

  /** Visual style of the button. Optional. */
  variant?: 'solid' | 'outline' | 'ghost';

  /** Text to display inside the button. Optional. */
  text?: string;

  /** Whether the button should stretch to fill its container. Optional. */
  fluid?: boolean;

  /** The roundness of the button's corners. Optional. */
  rounded?: 'half' | 'full';

  /** Whether to show a loading state. Optional. */
  loading?: boolean;

  /** Whether the button contains only an icon. Optional. */
  iconOnly?: boolean;

  /** Icon to display on the right side of the button text. Optional. */
  rightIcon?: string;

  /** Icon to display on the left side of the button text. Optional. */
  leftIcon?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibButton: DefineComponent<ButtonProps>;
  }
}
