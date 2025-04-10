import type { QuickSelectionItemKey } from './SubComponents';

export interface DatePickerProps {
  selectionItems?: Array<QuickSelectionItemKey>;
  selectionMode?: 'single' | 'multiple' | 'range';
  multipleMonth?: boolean;
  actionBar?: boolean;
  inline?: boolean;
  min?: Date | string;
  max?: Date | string;
}
