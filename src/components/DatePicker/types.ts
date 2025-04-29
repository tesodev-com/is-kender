import type { DefineComponent } from '@/@types/core';
import type { DateModel, QuickSelectionItemKey } from './SubComponents';

/**
 * Props for the DatePicker component.
 */
export interface DatePickerProps {
  /** Predefined quick selection options. Optional. */
  selectionItems?: Array<QuickSelectionItemKey>;

  /** Selection mode: single date, multiple dates, or a date range. Optional. */
  selectionMode?: 'single' | 'multiple' | 'range';

  /** Whether to display multiple months side by side. Optional. */
  multipleMonth?: boolean;

  /** Whether to show the action bar with apply/clear buttons. Optional. */
  actionBar?: boolean;

  /** Whether the calendar is shown inline instead of in a popup. Optional. */
  inline?: boolean;

  /** Minimum selectable date. Optional. */
  min?: Date | string;

  /** Maximum selectable date. Optional. */
  max?: Date | string;

  /** Specific dates to disable from selection. Optional. */
  disabledDates?: Array<Date | string>;

  /** The first day of the week. Optional. */
  weekStartDay?: 'monday' | 'sunday';

  /** Label text for the input or field. Optional. */
  label?: string;

  /** Placeholder text shown when no date is selected. Optional. */
  placeholder?: string;
}

/**
 * Events emitted by the DatePicker component.
 */
export interface DatePickerEmits {
  /**
   * Emitted when a date or date range is applied.
   * @param date - The selected date or date range.
   */
  (event: 'onApply', date: DateModel | undefined): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibDatePicker: DefineComponent<DatePickerProps, object, DatePickerEmits>;
  }
}
