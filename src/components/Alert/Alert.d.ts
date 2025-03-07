import { type DefineComponent } from 'vue';

export interface AlertProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
  variant?: 'solid' | 'outline';
  fluid?: boolean;
  closable?: boolean;
  life?: number;
  title?: string;
  text?: string;
}
export interface AlertSlots {
  icon: any;
  title: any;
  text: any;
}
export interface AlertEmits {
  (e: 'close'): void;
}

declare const Alert: DefineComponent<AlertProps, AlertSlots, AlertEmits>;

declare module 'vue' {
  export interface GlobalComponents {
    LibAlert: typeof Alert;
  }
}

export default Alert;
