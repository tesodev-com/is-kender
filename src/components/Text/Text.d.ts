import { type DefineComponent } from 'vue';

export interface TextProps {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontColor?: 'black' | 'white' | 'gray' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  customClass?: string;
}

declare const Text: DefineComponent<TextProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibText: typeof Text;
  }
}

export default Text;
