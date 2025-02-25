import { type DefineComponent } from 'vue';

export interface ButtonProps {
  el?: 'button' | 'a' | any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
  variant?: 'solid' | 'outline' | 'ghost';
  text?: string;
  fluid?: boolean;
  rounded?: 'half' | 'full';
  loading?: boolean;
  iconOnly?: boolean;
}

declare const Button: DefineComponent<ButtonProps>;

declare module 'vue' {
  export interface GlobalComponents {
    Button: typeof Button;
  }
}

export default Button;
