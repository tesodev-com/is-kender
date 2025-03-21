<template>
  <div class="toggle-wrapper">
    <div
      class="toggle"
      :class="{ 'toggle-checked': modelValue, 'toggle-disabled': disabled }"
      tabindex="0"
    >
      <input
        :id="generateId"
        v-model="modelValue"
        type="checkbox"
        class="toggle-input"
        :disabled="disabled"
      />
    </div>
    <div
      v-if="label"
      class="toggle-label"
    >
      <label
        v-if="label"
        class="toggle-label-text"
        :for="generateId"
      >
        {{ label }}
      </label>
      <p
        v-if="description"
        class="toggle-label-description"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToggleProps } from 'library-components/Toggle';
import { computed } from 'vue';

const modelValue = defineModel<boolean>({ required: true });
defineProps<ToggleProps>();
const generateId = computed(() => {
  return `toggle-${Math.random().toString(36).substring(7)}`;
});
</script>

<style lang="scss" scoped src="./Toggle.style.scss"></style>
