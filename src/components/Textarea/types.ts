import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Textarea component.
 */
export interface TextareaProps {
  /**
   * Unique identifier for the textarea.
   */
  id?: string;

  /**
   * Whether the textarea is in an error state.
   */
  error?: boolean;

  /**
   * Error message displayed below the textarea.
   */
  errorMessage?: string;

  /**
   * Hint message displayed below the textarea.
   */
  hintMessage?: string;

  /**
   * Whether the textarea is required.
   */
  required?: boolean;

  /**
   * Controls the resize behavior of the textarea.
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';

  /**
   * Number of visible text lines.
   */
  rows?: number;

  /**
   * Number of visible text columns.
   */
  cols?: number;

  /**
   * Whether the textarea is disabled.
   */
  disabled?: boolean;

  /**
   * Placeholder text displayed inside the textarea.
   */
  placeholder?: string;

  /**
   * Label text for the textarea.
   */
  label?: string;

  /**
   * Maximum number of characters allowed.
   */
  maxLength?: number;

  /**
   * Current value of the textarea.
   */
  modelValue?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTextarea: DefineComponent<TextareaProps>;
  }
}
