import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { IObserverRect, IUseResizeObserverProperties } from './types';

const defaultState: IObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export function useResizeObserver({ elementRef, element, options = { box: 'content-box' }, callback }: IUseResizeObserverProperties) {
  const rect = ref<IObserverRect>({ ...defaultState });

  let observer: ResizeObserver | undefined;

  const handleResize = (entries: ResizeObserverEntry[]) => {
    if (!observer) return;

    const entry = entries[0];
    if (entry) {
      const { x, y, width, height, top, left, bottom, right } = entry.contentRect;
      rect.value = { x, y, width, height, top, left, bottom, right };
      callback?.(entries);
    }
  };

  onMounted(() => {
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      observer = new ResizeObserver(handleResize);

      const targetNode = elementRef?.value ?? element;
      if (targetNode) {
        observer.observe(targetNode, options);
      }
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return rect;
}
