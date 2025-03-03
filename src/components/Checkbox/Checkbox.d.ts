import { type DefineComponent } from 'vue';

export interface CheckboxProps {
  name?: string;
  value: string;
  modelValue: string[];
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

declare const Checkbox: DefineComponent<CheckboxProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibCheckbox: typeof Checkbox;
  }
}

export default Checkbox;
