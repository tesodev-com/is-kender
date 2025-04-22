import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { IUseIntersectionObserverProperties } from './types';

export function useIntersectionObserver({ elementRef, element, options = { triggerOnce: false, threshold: 0 }, callback }: IUseIntersectionObserverProperties) {
  const isIntersecting = ref(false);

  let observer: IntersectionObserver | undefined;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!observer) return;

    if (options.triggerOnce) {
      const hasIntersected = entries.some(e => e.isIntersecting);
      if (hasIntersected) {
        callback?.(entries);
        observer.disconnect();
      }
      isIntersecting.value = hasIntersected;
      return;
    }

    const isIntersectingLast = entries[entries.length - 1].isIntersecting;
    if (isIntersectingLast) callback?.(entries);

    isIntersecting.value = isIntersectingLast;
  };

  onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(handleIntersect, options);

      const targetNode = elementRef?.value ?? element;
      if (targetNode) {
        observer.observe(targetNode);
      }
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return isIntersecting;
}
