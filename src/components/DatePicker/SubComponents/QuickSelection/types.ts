export type QuickSelectionItemKey = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'lastYear';

export interface QuickSelectionItem {
  key: QuickSelectionItemKey;
  label: string;
  func: () => Array<Date | string> | Date | string;
}

export interface QuickSelectionProps {
  selectionItems: Array<QuickSelectionItemKey>;
}

export interface QuickSelectionEmits {
  (event: 'onSelect', item: Array<Date | string> | Date | string): void;
}
