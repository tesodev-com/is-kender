import type { DateModel, QuickSelectionItemKey } from './SubComponents';

export interface DatePickerProps {
  selectionItems?: Array<QuickSelectionItemKey>;
  selectionMode?: 'single' | 'multiple' | 'range';
  multipleMonth?: boolean;
  actionBar?: boolean;
  inline?: boolean;
  min?: Date | string;
  max?: Date | string;
  disabledDates?: Array<Date | string>;
  weekStartDay?: 'monday' | 'sunday';
}

export interface DatePickerEmits {
  (event: 'onApply', date: DateModel | undefined): void;
}
