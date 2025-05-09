export interface TextareaProps {
  /**
   * Unique identifier for the textarea element
   */
  id?: string;

  /**
   * Whether the textarea is in error state
   */
  error?: boolean;

  /**
   * Error message to display when in error state
   */
  errorMessage?: string;

  /**
   * Helper text to provide additional context
   */
  hintMessage?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Resize behavior of the textarea
   * @default 'vertical'
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';

  /**
   * Number of visible text lines (rows)
   * @default 3
   */
  rows?: number;

  /**
   * Number of visible text columns
   * @default 20
   */
  cols?: number;

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;

  /**
   * Placeholder text when empty
   */
  placeholder?: string;

  /**
   * Label text for the textarea
   */
  label?: string;

  /**
   * Maximum allowed character count
   */
  maxLength?: number;

  /**
   * v-model binding for the textarea value
   */
  modelValue?: string;

  /**
   * Whether the textarea should automatically grow in height with content
   */
  autoResize?: boolean;

  /**
   * Whether to hide the resize handle
   */
  hideResize?: boolean;
}
