export type ToggleSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ToggleThumbShape = 'circle' | 'square';

export interface ToggleProps {
  disabled?: boolean;
  size?: ToggleSize;
  label?: string;
  description?: string;
  thumbShape?: ToggleThumbShape;
}

export interface ToggleEmits {
  'update:modelValue': [value: boolean];
}
