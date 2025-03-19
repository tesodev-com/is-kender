import { type DefineComponent, type VNode } from 'vue';

export interface OtpInputProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  digits?: number;
  label?: string;
  hint?: string;
  showDivider?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  numericOnly?: boolean;
  focusOnMount?: boolean;
}

export interface OtpInputSlots {
  label?: (props: { label: string | undefined }) => VNode[];
  hint?: (props: { hint: string | undefined }) => VNode[];
}

export interface OtpInputEmits {
  (e: 'complete', value: string): void;
}

declare const OtpInput: DefineComponent<OtpInputProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibOtpInput: typeof OtpInput;
  }
}

export default OtpInput;
