export interface TextareaProps {
  id?: string;
  error?: boolean;
  errorMessage?: string;
  hintMessage?: string;
  required?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  rows?: number;
  cols?: number;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  modelValue?: string;
  autoResize?: boolean;
  hideResize?: boolean;
}
