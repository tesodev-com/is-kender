export interface SelectOption {
  label: string;
  value: string;
  slotKey?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  noOptionsText?: string;
  requiredIndicator?: string;
  leftIcon?: string;
  required?: boolean;
  disabled?: boolean;
  isMultiple?: boolean;
  isSearch?: boolean;
  virtualScroll?: boolean;
  optionsPosition?: 'top' | 'bottom' | 'left' | 'right';
  optionsOffset?: number;
  itemHeight?: number;
  virtualScrollBuffer?: number;
  hint?: string;
}
