import type { Ref } from 'vue';

export interface IResizeObserverOptions {
  box?: 'content-box' | 'border-box' | 'device-pixel-content-box';
}

export interface IUseResizeObserverProperties {
  elementRef?: Ref<Element | null>;
  element?: Element | null;
  options?: IResizeObserverOptions;
  callback?: (entries: ResizeObserverEntry[]) => void;
}

export interface IObserverRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
}
