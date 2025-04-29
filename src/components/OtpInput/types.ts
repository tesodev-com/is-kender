import type { DefineComponent } from '@/@types/core';
import type { VNode } from 'vue';

/**
 * Props for the OtpInput component.
 */
export interface OtpInputProps {
  /**
   * Size of the OTP input fields.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Number of digits for the OTP input.
   */
  digits?: number;

  /**
   * Label text for the OTP input.
   */
  label?: string;

  /**
   * Hint text displayed below the input.
   */
  hint?: string;

  /**
   * Whether to show a divider between the input fields.
   */
  showDivider?: boolean;

  /**
   * Whether to mask the input as password.
   */
  isPassword?: boolean;

  /**
   * Placeholder text for the input fields.
   */
  placeholder?: string;

  /**
   * Whether only numeric input is allowed.
   */
  numericOnly?: boolean;

  /**
   * Whether the first input should be focused on mount.
   */
  focusOnMount?: boolean;

  /**
   * Whether the input is in an error state.
   */
  error?: boolean;

  /**
   * Error message to display.
   */
  errorMessage?: string;
}

/**
 * Slots available for the OtpInput component.
 */
export interface OtpInputSlots {
  /**
   * Slot for customizing the label.
   */
  label?: (props: { label: string | undefined }) => VNode[];

  /**
   * Slot for customizing the hint.
   */
  hint?: (props: { hint: string | undefined }) => VNode[];
}

/**
 * Event callbacks for the OtpInput component.
 */
export interface OtpInputEmits {
  /**
   * Triggered when all OTP digits are entered.
   * @param value The complete OTP value.
   */
  (e: 'complete', value: string): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibOtpInput: DefineComponent<OtpInputProps, OtpInputSlots, OtpInputEmits>;
  }
}
