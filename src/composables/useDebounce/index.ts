import { ref, onUnmounted } from 'vue';

const DEFAULT_DELAY = 300;

export function useDebounce<T extends(...args: any[]) => void>(fn: T, delay: number = DEFAULT_DELAY) {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  function debouncedFn(...args: Parameters<T>) {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  function cancel() {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = null;
    }
  }

  onUnmounted(cancel);

  return { debouncedFn, cancel };
}

