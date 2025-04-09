<template>
  <div
    class="range-slider-wrapper"
    :class="[`range-slider-${color}`, `thumb-${thumbShape}`, { 'is-range': isRange }]"
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
        <div class="range-track">
          <div
            v-if="isRange"
            class="range-progress"
            :style="{
              left: `${minProgress * 100}%`,
              width: `${(maxProgress - minProgress) * 100}%`,
            }"
          ></div>
          <div
            v-else
            class="range-progress"
            :style="{
              width: `${progress * 100}%`,
            }"
          ></div>
        </div>

        <template v-if="isRange">
          <input
            type="range"
            :min="min"
            :max="max"
            :step="step"
            :value="rangeValues[0]"
            class="range-input range-input-min"
            @input="handleRangeInput(0, $event)"
            @mouseenter="isThumbActive = true"
            @mouseleave="isThumbActive = false"
          />
          <div
            class="current-value current-value-min"
            :class="[`current-value-${color}`]"
            :style="{
              left: `calc(${minProgress * 100}%)`,
              opacity: isThumbActive ? 1 : 0,
              visibility: isThumbActive ? 'visible' : 'hidden',
              zIndex: 4,
            }"
          >
            {{ rangeValues[0] }}{{ unit }}
          </div>

          <input
            type="range"
            :min="min"
            :max="max"
            :step="step"
            :value="rangeValues[1]"
            class="range-input range-input-max"
            @input="handleRangeInput(1, $event)"
            @mouseenter="isThumbActive = true"
            @mouseleave="isThumbActive = false"
          />
          <div
            class="current-value current-value-max"
            :class="[`current-value-${color}`]"
            :style="{
              left: `calc(${maxProgress * 100}%)`,
              opacity: isThumbActive ? 1 : 0,
              visibility: isThumbActive ? 'visible' : 'hidden',
              zIndex: 4,
            }"
          >
            {{ rangeValues[1] }}{{ unit }}
          </div>
        </template>

        <template v-else>
          <input
            type="range"
            :min="min"
            :max="max"
            :step="step"
            :value="currentValue"
            class="range-input"
            @input="handleInput"
            @mouseenter="isThumbActive = true"
            @mouseleave="isThumbActive = false"
          />
          <div
            class="current-value"
            :class="[`current-value-${color}`]"
            :style="{
              left: `calc(${progress * 100}%)`,
              opacity: isThumbActive ? 1 : 0,
              visibility: isThumbActive ? 'visible' : 'hidden',
            }"
          >
            {{ currentValue }}{{ unit }}
          </div>
        </template>
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
import { computed, ref, watch } from 'vue';
import type { RangeSliderEmits, RangeSliderProps } from './types';

// interfaces & types

// constants

// composable

// props & model
const modelValue = defineModel<number | string | [number, number] | [string, string]>();

const props = withDefaults(defineProps<Omit<RangeSliderProps, 'modelValue'>>(), {
  min: 0,
  max: 100,
  step: 1,
  unit: '',
  label: 'Value',
  alwaysReturnWithUnit: false,
  color: 'primary',
  isRange: false,
  thumbShape: 'circle',
});

// emits
const emit = defineEmits<RangeSliderEmits>();

// states (refs and reactives)
const rangeValues = ref<[number, number]>([props.min, props.max]);
const isThumbActive = ref(false);

// computed
const parseValue = (value: string | number | undefined | null): number => {
  if (value === undefined || value === null) return props.min;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    return parseFloat(value.replace(props.unit, '')) || props.min;
  }
  return props.min;
};

const parseRangeValues = (value: unknown): [number, number] => {
  if (Array.isArray(value) && value.length === 2) {
    const [min, max] = value.map(v => parseValue(v));
    return [min, max];
  }
  if (typeof value === 'number' || typeof value === 'string') {
    const val = parseValue(value);
    const midPoint = (props.max - props.min) / 2;
    return [Math.max(val - midPoint / 2, props.min), Math.min(val + midPoint / 2, props.max)];
  }
  return [props.min, props.max];
};

const initializeRangeValues = () => {
  if (!modelValue.value) {
    rangeValues.value = [props.min, props.max];
    return;
  }

  if (props.isRange) {
    const [min, max] = parseRangeValues(modelValue.value);
    rangeValues.value = [Math.min(Math.max(min, props.min), props.max), Math.min(Math.max(max, props.min), props.max)];
  } else {
    const val = parseValue(modelValue.value as number | string);
    rangeValues.value = [props.min, val];
  }
};

const currentValue = computed(() => {
  const parsed = parseValue((modelValue.value as number | string) ?? props.min);
  return Math.min(Math.max(parsed, props.min), props.max);
});

const progress = computed(() => {
  return (currentValue.value - props.min) / (props.max - props.min);
});

const minProgress = computed(() => {
  return (rangeValues.value[0] - props.min) / (props.max - props.min);
});

const maxProgress = computed(() => {
  return (rangeValues.value[1] - props.min) / (props.max - props.min);
});

const cssVars = computed(() => ({
  '--range-progress': progress.value,
  '--range-min-progress': minProgress.value,
  '--range-max-progress': maxProgress.value,
}));

// watchers
watch(
  () => modelValue.value,
  () => {
    if (props.isRange) {
      initializeRangeValues();
    }
  },
  { immediate: true }
);

watch(
  () => props.isRange,
  newIsRange => {
    try {
      if (newIsRange) {
        const currentVal = parseValue(modelValue.value as number | string);
        const [newMin, newMax] = parseRangeValues(currentVal);

        rangeValues.value = [newMin, newMax];
        const finalValue = props.alwaysReturnWithUnit ? ([`${newMin}${props.unit}`, `${newMax}${props.unit}`] as [string, string]) : ([newMin, newMax] as [number, number]);

        modelValue.value = finalValue;
      } else {
        const [min, max] = parseRangeValues(modelValue.value);
        const newValue = (min + max) / 2;

        const finalValue = props.alwaysReturnWithUnit ? `${newValue}${props.unit}` : newValue;

        modelValue.value = finalValue;
      }
    } catch {
      if (newIsRange) {
        modelValue.value = props.alwaysReturnWithUnit ? [`${props.min}${props.unit}`, `${props.max}${props.unit}`] : [props.min, props.max];
      } else {
        modelValue.value = props.alwaysReturnWithUnit ? `${props.min}${props.unit}` : props.min;
      }
    }
  }
);

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

const handleRangeInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (isNaN(value)) return;

  const validatedValue = Math.min(Math.max(value, props.min), props.max);

  if (index === 0 && validatedValue > rangeValues.value[1]) {
    rangeValues.value[0] = rangeValues.value[1];
  } else if (index === 1 && validatedValue < rangeValues.value[0]) {
    rangeValues.value[1] = rangeValues.value[0];
  } else {
    rangeValues.value[index] = validatedValue;
  }

  const finalValue = props.alwaysReturnWithUnit
    ? ([`${rangeValues.value[0]}${props.unit}`, `${rangeValues.value[1]}${props.unit}`] as [string, string])
    : ([rangeValues.value[0], rangeValues.value[1]] as [number, number]);

  modelValue.value = finalValue;
  emit('update:modelValue', finalValue);
};
</script>

<style lang="scss" scoped src="./RangeSlider.style.scss"></style>
