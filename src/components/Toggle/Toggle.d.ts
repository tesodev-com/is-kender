import { type DefineComponent } from 'vue';

export interface ToggleProps {
  disabled?: boolean;
  label?: string;
  description?: string;
}

declare const Toggle: DefineComponent<ToggleProps>;

declare module 'vue' {
  export interface GlobalComponents {
    Toggle: typeof Toggle;
  }
}

export default Toggle;
