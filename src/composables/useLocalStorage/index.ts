import { clear, getItem, removeItem } from '@/utils/localStorage';
import { ref, watch } from 'vue';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const state = ref<T | null>(getItem<T>(key) ?? defaultValue ?? null);

  const set = (value: T | null) => {
    state.value = value;
  };

  const remove = () => {
    state.value = null;
    removeItem(key);
  };

  watch(
    state,
    newValue => {
      if (newValue === null) {
        remove();
      } else {
        set(newValue);
      }
    },
    { deep: true }
  );

  return {
    state,
    set,
    remove,
  };
}

export function useClearLocalStorage() {
  return {
    clearAll: () => {
      clear();
    },
  };
}
