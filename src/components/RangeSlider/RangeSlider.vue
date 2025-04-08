<template>
  <div
    class="range-slider-wrapper"
    :class="[`range-slider-${color}`]"
    :style="cssVars"
  >
    <div class="range-header">
      <span class="range-label">
        {{ label }}
        <span v-if="unit">{{ `(${unit})` }}</span>
      </span>
    </div>

    <div class="range-controls">
      <div class="slider-container">
        <input
          type="range"
          :min="min"
          :max="max"
          :step="step"
          :value="currentValue"
          class="range-input"
          @input="handleInput"
        />
        <div
          class="current-value"
          :class="[`current-value-${color}`]"
          :style="{
            left: `calc(${progress * 100}% + (${9 * (1 - progress * 2)}px))`,
          }"
        >
          {{ currentValue }}{{ unit }}
        </div>
      </div>
      <div class="range-limits">
        <span class="range-limit min">{{ min }}{{ unit }}</span>
        <span class="range-limit max">{{ max }}{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { computed } from 'vue';
import type { RangeSliderEmits, RangeSliderProps } from './types';

// interfaces & types

// constants

// composable

// props & model
const modelValue = defineModel<number | string>();

const props = withDefaults(defineProps<Omit<RangeSliderProps, 'modelValue'>>(), {
  min: 0,
  max: 100,
  step: 1,
  unit: '',
  label: 'Value',
  alwaysReturnWithUnit: false,
  color: 'primary',
});

// emits
const emit = defineEmits<RangeSliderEmits>();

// states (refs and reactives)

// computed
const parseValue = (value: string | number): number => {
  if (value === undefined || value === null) return props.min;
  if (typeof value === 'number') return value;
  return parseFloat(value.replace(props.unit, '')) || props.min;
};

const currentValue = computed(() => {
  const parsed = parseValue(modelValue.value ?? props.min);
  return Math.min(Math.max(parsed, props.min), props.max);
});

const progress = computed(() => {
  return (currentValue.value - props.min) / (props.max - props.min);
});
const cssVars = computed(() => ({
  '--range-progress': progress.value,
}));

// watchers

// lifecycles

// methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (isNaN(value)) return;

  const validatedValue = Math.min(Math.max(value, props.min), props.max);

  const finalValue = props.alwaysReturnWithUnit ? `${validatedValue}${props.unit}` : validatedValue;

  modelValue.value = finalValue;

  emit('update:modelValue', finalValue);
};
</script>

<style lang="scss" scoped src="./RangeSlider.style.scss"></style>
