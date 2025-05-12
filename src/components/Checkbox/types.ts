import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps {
  /** The name attribute of the checkbox input. Optional. */
  name?: string;

  /** The value associated with the checkbox. */
  value: string;

  /** Whether the checkbox is disabled. Optional. */
  disabled?: boolean;

  /** Size of the checkbox. Optional. */
  size?: 'sm' | 'md' | 'lg';

  /** Label displayed next to the checkbox. Optional. */
  label?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibCheckbox: DefineComponent<CheckboxProps>;
  }
}
