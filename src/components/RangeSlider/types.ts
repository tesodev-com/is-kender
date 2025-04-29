import type { DefineComponent } from '@/@types/core';

/**
 * Props for the RangeSlider component.
 */
export interface RangeSliderProps {
  /**
   * The current value of the slider.
   */
  modelValue?: number | string | [number, number] | [string, string];

  /**
   * Minimum allowed value.
   */
  min?: number;

  /**
   * Maximum allowed value.
   */
  max?: number;

  /**
   * Step size between values.
   */
  step?: number;

  /**
   * Unit label appended to the value.
   */
  unit?: string;

  /**
   * Label displayed for the slider.
   */
  label?: string;

  /**
   * Whether to always return the value with its unit.
   */
  alwaysReturnWithUnit?: boolean;

  /**
   * Color theme of the slider.
   */
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

  /**
   * Whether the slider allows selecting a range.
   */
  isRange?: boolean;

  /**
   * Shape of the slider thumb.
   */
  thumbShape?: 'circle' | 'square';
}

/**
 * Event callbacks for the RangeSlider component.
 */
export interface RangeSliderEmits {
  /**
   * Triggered when the modelValue is updated.
   * @param value The updated slider value.
   */
  'update:modelValue': [value: number | string | [number, number] | [string, string]];
}

declare module 'vue' {
  export interface GlobalComponents {
    LibRangeSlider: DefineComponent<RangeSliderProps, object, RangeSliderEmits>;
  }
}
