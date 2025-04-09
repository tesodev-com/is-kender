import type { QuickSelectionItemKey } from './SubComponents';

export interface DatePickerProps {
  selectionItems?: Array<QuickSelectionItemKey>;
  selectionMode?: 'single' | 'range';
}
