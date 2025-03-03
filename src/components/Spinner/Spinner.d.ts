import { type DefineComponent } from 'vue';

export interface SpinnerProps {
  size?: string;
  fluid?: boolean;
  color?: string;
}

declare const Spinner: DefineComponent<SpinnerProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSpinner: typeof Spinner;
  }
}

export default Spinner;
