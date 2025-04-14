<template>
  <div
    class="range-slider-wrapper"
    :class="[`range-slider-${color}`, `thumb-${thumbShape}`, { 'is-range': isRange }]"
    :style="cssVars"
  >
    <div
      v-if="label"
      class="range-header"
    >
      <span class="range-label">
        {{ label }}
      </span>
      <span
        v-if="unit"
        class="range-unit"
      >
        {{ `(${unit})` }}
      </span>
    </div>

    <div class="range-controls">
      <div
        ref="sliderContainerRef"
        class="slider-container"
      >
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
            @mouseover="isThumbActive = true"
            @mouseleave="isThumbActive = false"
            @touchstart="isThumbActive = true"
            @touchend="isThumbActive = false"
            @focus="isThumbActive = true"
            @blur="isThumbActive = false"
          />
          <div
            class="current-value current-value-min"
            :class="[`current-value-${color}`]"
            :style="{
              left: tooltipPositions.min,
              opacity: isThumbActive ? 1 : 0,
              visibility: isThumbActive ? 'visible' : 'hidden',
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
            @mouseover="isThumbActive = true"
            @mouseenter="isThumbActive = true"
            @mouseleave="isThumbActive = false"
            @touchstart="isThumbActive = true"
            @touchend="isThumbActive = false"
            @focus="isThumbActive = true"
            @blur="isThumbActive = false"
          />
          <div
            class="current-value current-value-max"
            :class="[`current-value-${color}`]"
            :style="{
              left: tooltipPositions.max,
              opacity: isThumbActive ? 1 : 0,
              visibility: isThumbActive ? 'visible' : 'hidden',
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
            @mouseover="isThumbActive = true"
            @mouseleave="isThumbActive = false"
            @touchstart="isThumbActive = true"
            @touchend="isThumbActive = false"
            @focus="isThumbActive = true"
            @blur="isThumbActive = false"
          />
          <div
            class="current-value"
            :class="[`current-value-${color}`]"
            :style="{
              left: tooltipPositions.single,
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
import type { RangeSliderEmits, RangeSliderProps } from './types';
import { clampValue, formatWithUnit, parseRangeValues, parseValue, roundToStep, scaleValue } from './utils';

// interfaces & types

// constants
const SLIDER_PADDING = 9;

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
const sliderContainer = useTemplateRef<HTMLElement>('sliderContainerRef');
const containerWidth = ref(0);
const isMounted = ref(false);
const resizeObserver = ref<ResizeObserver | null>(null);

// computed
const currentValue = computed(() => {
  const parsed = parseValue(modelValue.value as number | string, props.unit, props.min);
  return clampValue(parsed, props.min, props.max);
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

const tooltipPositions = computed(() => {
  if (!isMounted.value) return { min: '0px', max: '0px', single: '0px' };

  const availableWidth = containerWidth.value || 100;

  const minTooltipLeft = SLIDER_PADDING + minProgress.value * availableWidth;
  const maxTooltipLeft = SLIDER_PADDING + maxProgress.value * availableWidth;
  const singleTooltipLeft = SLIDER_PADDING + progress.value * availableWidth;

  return {
    min: `${minTooltipLeft}px`,
    max: `${maxTooltipLeft}px`,
    single: `${singleTooltipLeft}px`,
  };
});

// lifecycles
onMounted(async () => {
  initializeRangeValues();
  await nextTick();
  updateContainerWidth();
  isMounted.value = true;

  resizeObserver.value = new ResizeObserver(() => {
    updateContainerWidth();
  });

  if (sliderContainer.value) {
    resizeObserver.value.observe(sliderContainer.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
});

// methods
const initializeRangeValues = () => {
  if (!modelValue.value) {
    rangeValues.value = [props.min, props.max];
    return;
  }

  if (props.isRange) {
    const [min, max] = parseRangeValues(modelValue.value, props.min, props.max, props.unit);
    rangeValues.value = [clampValue(min, props.min, props.max), clampValue(max, props.min, props.max)];
  }
};

const updateContainerWidth = () => {
  if (sliderContainer.value) {
    containerWidth.value = sliderContainer.value.offsetWidth - SLIDER_PADDING * 2;
  }
};

// watchers
watch([progress, minProgress, maxProgress], () => {
  if (isMounted.value) {
    updateContainerWidth();
  }
});

watch(
  () => props.step,
  newStep => {
    if (props.isRange && modelValue.value) {
      const [currentMin, currentMax] = Array.isArray(modelValue.value) ? modelValue.value.map(v => parseValue(v, props.unit, props.min)) : [props.min, props.max];

      rangeValues.value = [roundToStep(clampValue(currentMin, props.min, props.max), newStep), roundToStep(clampValue(currentMax, props.min, props.max), newStep)];

      const finalValue = props.alwaysReturnWithUnit
        ? ([formatWithUnit(rangeValues.value[0], props.unit), formatWithUnit(rangeValues.value[1], props.unit)] as [string, string])
        : ([rangeValues.value[0], rangeValues.value[1]] as [number, number]);

      modelValue.value = finalValue;
      emit('update:modelValue', finalValue);
    } else if (!props.isRange) {
      const currentValue = parseValue(modelValue.value as number | string, props.unit, props.min);
      const roundedValue = roundToStep(clampValue(currentValue, props.min, props.max), newStep);

      const finalValue = props.alwaysReturnWithUnit ? formatWithUnit(roundedValue, props.unit) : roundedValue;

      modelValue.value = finalValue;
      emit('update:modelValue', finalValue);
    }
  }
);

watch([() => props.min, () => props.max], ([newMin, newMax], [oldMin, oldMax]) => {
  if (props.isRange && modelValue.value) {
    const [currentMin, currentMax] = Array.isArray(modelValue.value) ? modelValue.value.map(v => parseValue(v, props.unit, props.min)) : [props.min, props.max];

    const scaledMin = scaleValue(currentMin, oldMin, oldMax, newMin, newMax, props.step);
    const scaledMax = scaleValue(currentMax, oldMin, oldMax, newMin, newMax, props.step);

    const clampedMin = clampValue(scaledMin, newMin, newMax);
    const clampedMax = clampValue(scaledMax, newMin, newMax);

    rangeValues.value = [roundToStep(Math.min(clampedMin, clampedMax), props.step), roundToStep(Math.min(clampedMax, newMax), props.step)];

    const finalValue = props.alwaysReturnWithUnit
      ? ([formatWithUnit(rangeValues.value[0], props.unit), formatWithUnit(rangeValues.value[1], props.unit)] as [string, string])
      : ([rangeValues.value[0], rangeValues.value[1]] as [number, number]);

    modelValue.value = finalValue;
    emit('update:modelValue', finalValue);
  } else if (!props.isRange) {
    const currentValue = parseValue(modelValue.value as number | string, props.unit, props.min);
    const scaledValue = scaleValue(currentValue, oldMin, oldMax, newMin, newMax, props.step);
    const clampedValue = clampValue(scaledValue, newMin, newMax);

    const finalValue = props.alwaysReturnWithUnit ? formatWithUnit(clampedValue, props.unit) : clampedValue;

    modelValue.value = finalValue;
    emit('update:modelValue', finalValue);
  }
});

watch(
  () => modelValue.value,
  newValue => {
    if (props.isRange && newValue) {
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
        const currentVal = parseValue(modelValue.value as number | string, props.unit, props.min);
        const [newMin, newMax] = parseRangeValues(currentVal, props.min, props.max, props.unit);

        rangeValues.value = [Math.min(Math.max(newMin, props.min), props.max), Math.min(Math.max(newMax, props.min), props.max)];

        const finalValue = props.alwaysReturnWithUnit
          ? ([formatWithUnit(rangeValues.value[0], props.unit), formatWithUnit(rangeValues.value[1], props.unit)] as [string, string])
          : ([rangeValues.value[0], rangeValues.value[1]] as [number, number]);

        modelValue.value = finalValue;
      } else {
        const [min, max] = parseRangeValues(modelValue.value, props.min, props.max, props.unit);
        const newValue = Math.min(Math.max((min + max) / 2, props.min), props.max);

        const finalValue = props.alwaysReturnWithUnit ? formatWithUnit(newValue, props.unit) : newValue;

        modelValue.value = finalValue;
      }
    } catch {
      if (newIsRange) {
        modelValue.value = props.alwaysReturnWithUnit ? [formatWithUnit(props.min, props.unit), formatWithUnit(props.max, props.unit)] : [props.min, props.max];
      } else {
        modelValue.value = props.alwaysReturnWithUnit ? formatWithUnit(props.min, props.unit) : props.min;
      }
    }
  }
);

// methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (isNaN(value)) return;

  const validatedValue = roundToStep(clampValue(value, props.min, props.max), props.step);
  const finalValue = props.alwaysReturnWithUnit ? formatWithUnit(validatedValue, props.unit) : validatedValue;

  modelValue.value = finalValue;
  emit('update:modelValue', finalValue);
};

const handleRangeInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (isNaN(value)) return;

  const validatedValue = roundToStep(clampValue(value, props.min, props.max), props.step);

  if (index === 0 && validatedValue > rangeValues.value[1]) {
    rangeValues.value[0] = roundToStep(rangeValues.value[1], props.step);
  } else if (index === 1 && validatedValue < rangeValues.value[0]) {
    rangeValues.value[1] = roundToStep(rangeValues.value[0], props.step);
  } else {
    rangeValues.value[index] = validatedValue;
  }

  const finalValue = props.alwaysReturnWithUnit
    ? ([formatWithUnit(rangeValues.value[0], props.unit), formatWithUnit(rangeValues.value[1], props.unit)] as [string, string])
    : ([rangeValues.value[0], rangeValues.value[1]] as [number, number]);

  modelValue.value = finalValue;
  emit('update:modelValue', finalValue);
};
</script>

<style lang="scss" scoped src="./RangeSlider.style.scss"></style>
