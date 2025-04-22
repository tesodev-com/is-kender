import { onMounted, onUnmounted, ref } from 'vue';

export function useClickOutside(elementRefs: any, callback?: () => void) {
  const isOutside = ref(false);

  const handleClick = (event: Event) => {
    const isClickInDropdown = (document.querySelector('.select-dropdown') as HTMLElement)?.contains(event.target as Node);

    if (!Array.isArray(elementRefs) && elementRefs.value) {
      isOutside.value = !elementRefs.value.contains(event.target) && !isClickInDropdown;
    } else if (Array.isArray(elementRefs)) {
      isOutside.value = elementRefs.every(elementRef => elementRef.value && !elementRef.value.contains(event.target)) && !isClickInDropdown;
    }

    if (isOutside.value) {
      callback?.();
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick);
    document.removeEventListener('touchstart', handleClick);
  });

  return isOutside;
}
