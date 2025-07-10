import { computed, onMounted, onUnmounted, ref } from 'vue';

const zIndex = ref(999);
const stack = ref<number[]>([]);

function getNextZIndex() {
  zIndex.value += 2;
  return zIndex.value;
}

export function useStacking() {
  const instanceZIndex = ref(0);
  const id = Date.now() + Math.random();

  const isTopmost = computed(() => {
    return stack.value.length > 0 && stack.value[stack.value.length - 1] === id;
  });

  onMounted(() => {
    instanceZIndex.value = getNextZIndex();
    stack.value.push(id);
  });

  onUnmounted(() => {
    const index = stack.value.indexOf(id);
    if (index > -1) {
      stack.value.splice(index, 1);
    }
  });

  return {
    zIndex: instanceZIndex,
    isTopmost,
  };
}
