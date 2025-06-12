import type { DefineComponent } from '@/@types/core';
import type { VNode } from 'vue';

/**
 * Represents an option in the Select component.
 */
export interface SelectOption {
  [key: string]: any;
  /**
   * The display label for the option.
   */
  label?: string;

  /**
   * The value associated with the option.
   */
  value?: string;

  /**
   * Optional key to map a custom slot for the option.
   */
  slotKey?: string;

  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the Select component.
 */
export interface SelectProps {
  /**
   * List of selectable options.
   */
  options: SelectOption[];

  /**
   * Label displayed above the select input.
   */
  label?: string;

  /**
   * Placeholder text for the select input.
   */
  placeholder?: string;

  /**
   * Placeholder text for the search input.
   */
  searchPlaceholder?: string;

  /**
   * Text displayed when no options are available.
   */
  noOptionsText?: string;

  /**
   * Indicator for required fields.
   */
  requiredIndicator?: string;

  /**
   * Name of the icon displayed on the left.
   */
  leftIcon?: string;

  /**
   * Whether the select field is required.
   */
  required?: boolean;

  /**
   * Whether the select field is disabled.
   */
  disabled?: boolean;

  /**
   * Whether multiple selections are allowed.
   */
  isMultiple?: boolean;

  /**
   * Whether a search input is shown to filter options.
   */
  isSearch?: boolean;

  /**
   * Whether to enable virtual scrolling for options.
   */
  virtualScroll?: boolean;

  /**
   * Preferred position of the options list.
   */
  optionsPosition?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Offset distance of the options list from the select input.
   */
  optionsOffset?: number;

  /**
   * Height of each option item in pixels.
   */
  itemHeight?: number;

  /**
   * Number of extra items to render before and after the visible area in virtual scroll.
   */
  virtualScrollBuffer?: number;

  /**
   * Hint text displayed below the select input.
   */
  hint?: string;

  /**
   * Custom item value property name
   */
  useValue?: string;

  /**
   * Custom item label property name
   */
  useLabel?: string;
}

/**
 * Slots available for the Select component.
 */
export interface SelectSlots {
  /**
   * Custom slot for a specific option.
   */
  option?(props: SelectOption): any;

  /**
   * Custom slot for a specific option.
   */
  [key: `option-${string}`]: (props: SelectOption) => any;

  /**
   * Slot for the label above the select input.
   */
  hint?: () => VNode[] | undefined;
}

export interface SelectEmits {
  /**
   * Emitted when the selected a value.
   * @param value - The new selected value.
   */
  (e: 'select', value: SelectOption): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibSelect: DefineComponent<SelectProps, SelectSlots, SelectEmits>;
  }
}
