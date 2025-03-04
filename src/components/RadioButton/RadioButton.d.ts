import { type DefineComponent } from 'vue';

export interface RadioButtonProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

declare const RadioButton: DefineComponent<RadioButtonProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibRadioButton: typeof RadioButton;
  }
}

export default RadioButton;
