export interface TextareaProps {
  // Unique ID
  id?: string;
  // Error state
  error?: boolean;
  // Error text
  errorMessage?: string;
  // Helper text
  hintMessage?: string;
  // Required field
  required?: boolean;
  // Resize behavior
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  // Default visible rows
  rows?: number;
  // Default visible columns
  cols?: number;
  // Disabled state
  disabled?: boolean;
  // Placeholder text
  placeholder?: string;
  // Input label
  label?: string;
  // Max allowed characters
  maxLength?: number;
  // v-model binding
  modelValue?: string;
  // Auto-grow height
  autoResize?: boolean;
  // Hide resize handle
  hideResize?: boolean;
}
