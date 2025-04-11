export interface RangeSliderProps {
  modelValue?: number | string | [number, number] | [string, string];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  label?: string;
  alwaysReturnWithUnit?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
  isRange?: boolean;
  thumbShape?: 'circle' | 'square';
}

export interface RangeSliderEmits {
  'update:modelValue': [value: number | string | [number, number] | [string, string]];
}
