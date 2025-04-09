export type QuickSelectionItemKey = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'lastYear';

export interface QuickSelectionItem {
  key: QuickSelectionItemKey;
  label: string;
  func: () => [Date, Date];
}

export interface QuickSelectionProps {
  selectionItems: Array<QuickSelectionItemKey>;
}

export interface QuickSelectionEmits {
  (event: 'select', item: Array<Date>): void;
}
