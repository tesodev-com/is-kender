import { type DefineComponent } from 'vue';

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  errorList?: string[];
  disabled?: boolean;
  modelValue?: string;
  fluid?: boolean;
  label?: string;
  size?: 'sm' | 'lg';
  maxlength?: number;
  minlength?: number;
  hint?: string;
  required?: boolean;
}

declare const Input: DefineComponent<InputProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibInput: typeof Input;
  }
}

export default Input;
