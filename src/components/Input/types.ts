import type { DefineComponent } from '@/@types/core';
import type { Tooltip } from '@/directives/vTooltip';

/**
 * Props for the Input component.
 */
export interface InputProps {
  /**
   * The type of the input field.
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

  /**
   * Placeholder text displayed inside the input.
   */
  placeholder?: string;

  /**
   * List of error messages related to the input.
   */
  errorList?: string[];

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * The current value of the input.
   */
  modelValue: string;

  /**
   * Whether the input should take up the full width of its container.
   */
  fluid?: boolean;

  /**
   * Label text displayed for the input.
   */
  label?: string;

  /**
   * Size of the input field.
   */
  size?: 'sm' | 'lg';

  /**
   * Maximum number of characters allowed.
   */
  maxlength?: number;

  /**
   * Minimum number of characters required.
   */
  minlength?: number;

  /**
   * Hint text displayed below the input.
   */
  hint?: string;

  /**
   * Whether the input is required.
   */
  required?: boolean;

  /**
   * Tooltip configuration for the input.
   */
  tooltip?: Tooltip;

  /**
   * Whether the input is read-only.
   */
  readOnly?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibInput: DefineComponent<InputProps>;
  }
}
