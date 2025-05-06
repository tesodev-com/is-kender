<template>
  <div class="toggle-wrapper">
    <button
      type="button"
      class="toggle"
      :class="[
        `toggle-${size}`,
        `toggle-thumb-${thumbShape}`,
        {
          'toggle-checked': modelValue,
          'toggle-disabled': disabled,
        },
      ]"
      :disabled="disabled"
      @click="modelValue = !modelValue"
    >
      <input
        :id="id"
        type="checkbox"
        class="toggle-input"
        :checked="modelValue"
        :disabled="disabled"
      />
    </button>
    <label
      v-if="label || description"
      :for="id"
      class="toggle-label"
    >
      <span
        v-if="label"
        class="toggle-label-text"
      >
        {{ label }}
      </span>
      <span
        v-if="description"
        class="toggle-label-description"
      >
        {{ description }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { ToggleProps } from './types';

// interfaces & types

// constants

// composable

// props
withDefaults(defineProps<ToggleProps>(), {
  disabled: false,
  size: 'md',
  label: undefined,
  description: undefined,
  thumbShape: 'circle',
});

// defineEmits

// defineSlots

// defineModel
const modelValue = defineModel<boolean>({ required: true });

// states (refs and reactives)

// computed
const id = computed(() => `toggle-${Math.random().toString(36).substring(7)}`);

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./Toggle.style.scss"></style>
