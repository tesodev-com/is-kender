export interface RangeSliderProps {
  modelValue: number | string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  label?: string;
  alwaysReturnWithUnit?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
}

export interface RangeSliderEmits {
  'update:modelValue': [value: number | string];
}
