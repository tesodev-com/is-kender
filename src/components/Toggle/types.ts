import type { DefineComponent } from '@/@types/core';

/**
 * Available sizes for the Toggle component.
 */
export type ToggleSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Available thumb shapes for the Toggle component.
 */
export type ToggleThumbShape = 'circle' | 'square';

/**
 * Props for the Toggle component.
 */
export interface ToggleProps {
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean;

  /**
   * Size of the toggle.
   */
  size?: ToggleSize;

  /**
   * Label text displayed next to the toggle.
   */
  label?: string;

  /**
   * Description text displayed below the toggle.
   */
  description?: string;

  /**
   * Shape of the toggle thumb.
   */
  thumbShape?: ToggleThumbShape;
}

/**
 * Event callbacks for the Toggle component.
 */
export interface ToggleEmits {
  /**
   * Triggered when the model value is updated.
   * @param value The new toggle state.
   */
  'update:modelValue': [value: boolean];
}

declare module 'vue' {
  export interface GlobalComponents {
    LibToggle: DefineComponent<ToggleProps, object, ToggleEmits>;
  }
}
