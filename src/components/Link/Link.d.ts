import { type DefineComponent } from 'vue';

export interface LinkProps {
  to?: string;
  useRouter?: boolean;
  isExternal?: boolean;
  rel?: string;
  target?: string;
  title?: string;
  underline?: boolean;
  disabled?: boolean;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontColor?: 'black' | 'white' | 'gray' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
}

declare const Link: DefineComponent<LinkProps>;

declare module 'vue' {
  export interface GlobalComponents {
    Link: typeof Link;
  }
}

export default Link;
