import { type DefineComponent } from 'vue';

export interface ToastMessageProps {
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
  title?: string;
  message?: string;
  life?: number;
}

export interface ToastProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animation?: 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down';
  listReverse?: boolean;
}

declare const Toast: DefineComponent<ToastProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibToast: typeof Toast;
  }
}

export default Toast;
