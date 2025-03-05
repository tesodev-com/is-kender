<template>
  <Teleport to="body">
    <transition
      :name="computeTransition"
      @after-leave="emit('toggle', false)"
    >
      <div
        v-if="isOpen"
        :class="[drawerClasses]"
        :style="drawerStyle"
      >
        <div
          v-if="hasHeader"
          class="drawer-header"
        >
          <h3>{{ title }}</h3>
          <button
            v-if="hasCloseButton"
            @click="closeDrawer"
          >
            <Svg
              :src="closeIcon"
              size="20"
            ></Svg>
          </button>
        </div>
        <div class="drawer-content">
          <slot />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="overlay"
        @click.stop="closeDrawer"
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { closeIcon } from '@/assets/icons';
import type { DrawerProps } from 'library/Drawer';
import Svg from 'library/Svg';
import { computed, onMounted, ref, watch } from 'vue';
const isOpen = ref(false);
const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'left',
  size: '50%',
  title: '',
  hasHeader: true,
  hasCloseButton: true,
});

const emit = defineEmits(['toggle']);

const computeTransition = computed(() => {
  const transition = {
    left: 'slide-left',
    right: 'slide-right',
    up: 'slide-up',
    down: 'slide-down',
  };
  return transition[props.position];
});

const drawerClasses = computed(() => ['drawer', `drawer-${props.position}`]);

const drawerStyle = computed(() => {
  return {
    '--drawer-size': props.size,
  };
});
onMounted(() => {
  isOpen.value = true;
});
watch(
  () => isOpen.value,
  newValue => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      const drawers = document.querySelectorAll('.drawer');
      if (drawers.length <= 1) {
        document.body.style.overflow = 'auto';
      }
    }
  },
  { immediate: true }
);

function closeDrawer() {
  isOpen.value = false;
}
</script>

<style lang="scss" scoped src="./Drawer.style.scss" />
