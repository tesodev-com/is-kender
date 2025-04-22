import type { Ref } from 'vue';

export interface IIntersectionObserverOptions {
  triggerOnce: boolean;
  threshold: number | number[];
  root?: Element;
  rootMargin?: string;
}

export interface IUseIntersectionObserverProperties {
  elementRef?: Ref<Element | null>;
  element?: Element | null;
  options?: IIntersectionObserverOptions;
  callback?: (entries: IntersectionObserverEntry[]) => void;
}
