import type { DefineComponent } from '@/@types/core';

/**
 * Props for the RadioButton component.
 */
export interface RadioButtonProps {
  /**
   * The unique identifier for the radio button.
   */
  id?: string;

  /**
   * The name attribute to group radio buttons.
   */
  name?: string;

  /**
   * The label text displayed next to the radio button.
   */
  label?: string;

  /**
   * The value of the radio button.
   */
  value: string;

  /**
   * Whether the radio button is disabled.
   */
  disabled?: boolean;

  /**
   * Size of the radio button.
   */
  size?: 'sm' | 'md' | 'lg';
}

declare module 'vue' {
  export interface GlobalComponents {
    LibRadioButton: DefineComponent<RadioButtonProps>;
  }
}
