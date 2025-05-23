<template>
  <transition
    name="fade"
    appear
    @after-leave="$emit('close')"
  >
    <div
      v-if="visible"
      :class="alertClasses"
    >
      <div class="alert">
        <div
          v-if="$slots.icon"
          class="alet-icon"
        >
          <component :is="$slots.icon"></component>
        </div>
        <div class="alert-content">
          <div class="alert-title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div class="alert-text">
            <slot name="text">
              {{ text }}
            </slot>
          </div>
        </div>
        <span
          v-if="closable"
          class="alert-close"
          @click="onClose"
        >
          <Svg
            :src="closeIcon"
            size="20"
          ></Svg>
        </span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// imports
import { closeIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { computed, onMounted, ref } from 'vue';
import type { AlertEmits, AlertProps, AlertSlots } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<AlertProps>(), {
  color: 'primary',
  variant: 'solid',
});

// defineEmits
defineEmits<AlertEmits>();

// defineSlots
defineSlots<AlertSlots>();

// states (refs and reactives)
const visible = ref(true);

// computed
const alertClasses = computed(() => {
  return ['alert-wrapper', `alert-${props.variant}`, `alert-${props.color}`, { 'alert-fluid': props.fluid }];
});

// watchers

// lifecycles
onMounted(() => {
  if (props.life) {
    setTimeout(() => {
      visible.value = false;
    }, props.life);
  }
});

// methods
function onClose() {
  visible.value = false;
}
</script>

<style lang="scss" scoped src="./Alert.style.scss"></style>
