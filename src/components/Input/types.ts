import type { Tooltip } from '@/directives/vTooltip';

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  errorList?: string[];
  disabled?: boolean;
  modelValue: string;
  fluid?: boolean;
  label?: string;
  size?: 'sm' | 'lg';
  maxlength?: number;
  minlength?: number;
  hint?: string;
  required?: boolean;
  tooltip?: Tooltip;
  readOnly?: boolean;
}
