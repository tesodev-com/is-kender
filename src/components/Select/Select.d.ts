import { type DefineComponent } from 'vue';

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
  leftIcon?: string;
  required?: boolean;
  hint?: string;
  isMultiple?: boolean;
  optionsPosition?: 'top' | 'bottom' | 'left' | 'right';
  optionsOffset?: number;
  isSearch?: boolean;
  disabled?: boolean;
  virtualScroll?: boolean;
  itemHeight?: number;
  virtualScrollBuffer?: number;
}

declare const Select: DefineComponent<SelectProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSelect: typeof Select;
  }
}

export default Select;
