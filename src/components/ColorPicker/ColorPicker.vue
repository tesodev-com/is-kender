<template>
  <div class="color-picker-container">
    <div ref="pickerButtonRef">
      <Button
        variant="outline"
        color="dark"
        size="sm"
        class="color-select-button"
        @click="togglePicker"
      >
        <div class="color-preview button-color">
          <div
            class="color-preview-box"
            :style="{ backgroundColor: previewColor }"
          ></div>
        </div>

        <span>{{ props.texts?.selectColor || 'Renk Seç' }}</span>
      </Button>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="pickerPopupRef"
        class="color-picker-popup"
        :class="{ draggable: props.isDraggable, 'is-dragging': isDragging }"
        :style="[props.isDraggable ? draggableStyle : positionStyles, { zIndex: zIndex }]"
        @mouseleave="handleMouseLeave"
      >
        <div
          ref="headerRef"
          class="color-picker-header"
        >
          <h3>{{ props.texts?.colorPicker || 'Renk Seçici' }}</h3>
          <button
            class="close-button"
            @click="togglePicker"
          >
            &times;
          </button>
        </div>

        <div class="color-picker-content">
          <!-- Color selection area -->
          <div
            ref="colorArea"
            class="color-area"
            @mousedown="startColorSelection"
            @touchstart.prevent="startColorSelection"
          >
            <div
              class="color-saturation"
              :style="{ backgroundColor: `hsl(${colorState.hsb.h}, 100%, 50%)` }"
            ></div>
            <div
              class="color-handler"
              :style="{
                left: `${sliderPositions.saturation}%`,
                top: `${100 - sliderPositions.brightness}%`,
                backgroundColor: previewColor,
              }"
            ></div>
          </div>

          <!-- Hue slider -->
          <div class="sliders-preview-container">
            <div class="sliders-container">
              <div class="slider-container">
                <div
                  ref="hueSlider"
                  class="hue-slider"
                  @mousedown="startHueSelection"
                  @touchstart.prevent="startHueSelection"
                >
                  <div
                    class="hue-slider-thumb"
                    :style="{ left: `${sliderPositions.hue}%` }"
                  ></div>
                </div>
              </div>

              <!-- Alpha slider -->
              <div class="slider-container">
                <div
                  ref="alphaSlider"
                  class="alpha-slider"
                  :style="{
                    background: `linear-gradient(to right, transparent, ${getColorWithoutAlpha})`,
                  }"
                  @mousedown="startAlphaSelection"
                  @touchstart.prevent="startAlphaSelection"
                >
                  <div
                    class="alpha-slider-thumb"
                    :style="{ left: `${sliderPositions.alpha}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <Button
              v-if="isEyeDropperSupported"
              class="eye-dropper-button"
              title="Renk Damlalığı"
              size="sm"
              iconOnly
              variant="outline"
              color="dark"
              rounded="full"
              @click="activateEyeDropper"
            >
              <Svg
                :src="colorizeIcon"
                size="20"
              ></Svg>
            </Button>
          </div>

          <!-- Color format selection -->
          <div class="format-selector">
            <button
              v-for="format in colorFormats"
              :key="format"
              :class="{ active: currentFormat === format }"
              @click="currentFormat = format"
            >
              {{ format.toUpperCase() }}
            </button>
          </div>

          <!-- Renk değeri alanları -->
          <div class="color-inputs">
            <template v-if="currentFormat === 'hex'">
              <div class="input-group">
                <label>HEX</label>
                <input
                  type="text"
                  :value="colorState.hex.replace('#', '')"
                  maxlength="7"
                  @input="handleHexInput"
                  @blur="handleHexBlur"
                />
              </div>
              <div class="input-group">
                <label>Alpha</label>
                <input
                  type="number"
                  :value="colorState.alpha"
                  min="0"
                  max="100"
                  @input="handleAlphaInput"
                  @blur="handleAlphaBlur"
                />
              </div>
            </template>

            <template v-else-if="currentFormat === 'rgb'">
              <div class="input-group">
                <label>R</label>
                <input
                  type="number"
                  :value="colorState.rgb.r"
                  min="0"
                  max="255"
                  @input="e => handleRgbInput('r', e)"
                  @blur="handleRgbBlur"
                />
              </div>
              <div class="input-group">
                <label>G</label>
                <input
                  type="number"
                  :value="colorState.rgb.g"
                  min="0"
                  max="255"
                  @input="e => handleRgbInput('g', e)"
                  @blur="handleRgbBlur"
                />
              </div>
              <div class="input-group">
                <label>B</label>
                <input
                  type="number"
                  :value="colorState.rgb.b"
                  min="0"
                  max="255"
                  @input="e => handleRgbInput('b', e)"
                  @blur="handleRgbBlur"
                />
              </div>
              <div class="input-group">
                <label>A</label>
                <input
                  type="number"
                  :value="colorState.alpha"
                  min="0"
                  max="100"
                  @input="handleAlphaInput"
                  @blur="handleAlphaBlur"
                />
              </div>
            </template>

            <template v-else-if="currentFormat === 'hsb'">
              <div class="input-group">
                <label>H</label>
                <input
                  type="number"
                  :value="colorState.hsb.h"
                  min="0"
                  max="360"
                  @input="e => handleHsbInput('h', e)"
                  @blur="handleHsbBlur"
                />
              </div>
              <div class="input-group">
                <label>S</label>
                <input
                  type="number"
                  :value="colorState.hsb.s"
                  min="0"
                  max="100"
                  @input="e => handleHsbInput('s', e)"
                  @blur="handleHsbBlur"
                />
              </div>
              <div class="input-group">
                <label>B</label>
                <input
                  type="number"
                  :value="colorState.hsb.b"
                  min="0"
                  max="100"
                  @input="e => handleHsbInput('b', e)"
                  @blur="handleHsbBlur"
                />
              </div>
              <div class="input-group">
                <label>A</label>
                <input
                  type="number"
                  :value="colorState.alpha"
                  min="0"
                  max="100"
                  @input="handleAlphaInput"
                  @blur="handleAlphaBlur"
                />
              </div>
            </template>
          </div>
          <div class="suggested-colors">
            <Text
              size="p"
              fontColor="gray"
              class="suggested-colors-title"
              font-size="xs"
            >
              {{ props.texts?.suggestedColors || 'Önerilen Renkler' }}
            </Text>
            <div class="color-list">
              <button
                v-for="color in suggestedColors"
                :key="color"
                class="color-item"
                :style="{ backgroundColor: color }"
                :title="color"
                @click="selectSuggestedColor(color)"
              ></button>
              <button
                class="color-item transparent"
                title="Transparan"
                @click="selectSuggestedColor('transparent')"
              >
                <span class="transparent-icon">×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// imports
import { colorizeIcon } from '@/assets/icons';
import { Button, Svg, Text } from '@/components/';
import { useClickOutside, useDraggable, useStacking } from '@/composables';
import { calculatePosition } from '@/utils/position';
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { colorUtils } from './colorUtils';
import type { ColorPickerProps } from './types';

// interfaces & types

// constants
const MAX_HEX_LENGTH = 7;
const MAX_ALPHA_LENGTH = 3;
const MAX_RGB_VALUE = 255;
const MAX_HSB_VALUES = { h: 360, s: 100, b: 100 };
// composable

// props
const modelValue = defineModel<string | undefined>('modelValue', { default: undefined });
const props = withDefaults(defineProps<Omit<ColorPickerProps, 'modelValue'>>(), {
  pickerPosition: 'right',
  isDraggable: false,
  initialPosition: () => ({ x: 0, y: 100 }),
  suggestedColors: () => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'],
  colorFormats: () => ['hex', 'rgb', 'hsb'],
  texts: () => ({
    selectColor: 'Renk Seç',
    colorPicker: 'Renk Seçici',
    suggestedColors: 'Önerilen Renkler',
  }),
});

// defineEmits

// states (refs and reactives)
const colorArea = ref<HTMLElement | null>(null);
const hueSlider = ref<HTMLElement | null>(null);
const alphaSlider = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const buttonRef = useTemplateRef<HTMLElement | null>('pickerButtonRef');
const popupRef = useTemplateRef<HTMLElement | null>('pickerPopupRef');
const isOpen = ref(false);
const isInitiallyUndefined = ref(modelValue.value === undefined);
const currentFormat = ref(props.colorFormats[0]);
const isColorSelecting = ref(false);
const isHueSelecting = ref(false);
const isAlphaSelecting = ref(false);
const isEyeDropperSupported = ref(false);
const colorState = reactive({
  hex: '#000000',
  rgb: { r: 0, g: 0, b: 0 },
  hsb: { h: 0, s: 0, b: 0 },
  alpha: 0,
  saturation: 0,
  brightness: 0,
});

const tempValues = reactive({
  hex: '#000000',
  rgb: { r: 0, g: 0, b: 0 },
  hsb: { h: 0, s: 0, b: 0 },
});

const positionStyles = reactive({
  top: '',
  left: '',
  right: '',
  bottom: '',
});
// computed
const { style: draggableStyle, isDragging } = useDraggable(popupRef, {
  initialValue: props.initialPosition,
  containerElement: bodyRef,
  handle: headerRef,
  preventDefault: true,
});

useClickOutside([popupRef, buttonRef], () => {
  if (isOpen.value) {
    isOpen.value = false;
    stopAllSelections();
  }
});
const { zIndex } = useStacking();

const colorFormats = computed(() => props.colorFormats);
const suggestedColors = computed(() => props.suggestedColors);

const outputColor = computed(() => {
  if (isInitiallyUndefined.value) return undefined;
  const { r, g, b } = colorState.rgb;
  const a = colorState.alpha / 100;

  if (a === 0) return 'rgba(0, 0, 0, 0)';
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : colorState.hex;
});

const previewColor = computed(() => {
  const { r, g, b } = colorState.rgb;
  const a = colorState.alpha / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
});

const getColorWithoutAlpha = computed(() => {
  const { r, g, b } = colorState.rgb;
  return `rgb(${r}, ${g}, ${b})`;
});

const sliderPositions = computed(() => ({
  hue: (colorState.hsb.h / 360) * 100,
  saturation: colorState.hsb.s,
  brightness: colorState.hsb.b,
  alpha: colorState.alpha,
}));

// The method was moved up here due to method dependency.
const parseInitialColor = () => {
  const color = modelValue.value || '';

  if (!color) return;

  if (color.startsWith('#')) {
    const hex = colorUtils.completeHex(color);
    if (colorUtils.isValidHex(hex)) {
      colorState.hex = hex;
      const rgb = colorUtils.hexToRgb(hex);
      if (rgb) {
        colorState.rgb = rgb;
        colorState.hsb = colorUtils.rgbToHsb(rgb.r, rgb.g, rgb.b);
        colorState.saturation = colorState.hsb.s;
        colorState.brightness = colorState.hsb.b;
        colorState.alpha = 100;
      }
    }
  } else if (color.startsWith('rgb')) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const a = match[4] ? parseFloat(match[4]) : 1;

      colorState.rgb = { r, g, b };
      colorState.hex = colorUtils.rgbToHex(r, g, b);
      colorState.hsb = colorUtils.rgbToHsb(r, g, b);
      colorState.alpha = Math.round(a * 100);
      colorState.saturation = colorState.hsb.s;
      colorState.brightness = colorState.hsb.b;
    }
  }
};
// watchers
watch(
  () => modelValue.value,
  newValue => {
    if (newValue !== outputColor.value) {
      parseInitialColor();
    }
  },
  { immediate: true }
);
// lifecycles
onMounted(() => {
  if (window.frameElement && window.parent) {
    bodyRef.value = window.parent.document.body as HTMLElement;
  } else {
    bodyRef.value = document.body as HTMLElement;
  }
  document.addEventListener('mouseup', stopAllSelections);
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);

  parseInitialColor();
  isEyeDropperSupported.value = typeof window !== 'undefined' && 'EyeDropper' in window;
});

onUnmounted(() => {
  document.removeEventListener('mouseup', stopAllSelections);
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
  stopAllSelections();
});
// methods
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastRan = 0;

  return function (this: any, ...args: any[]) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  } as T;
}

function updatePosition() {
  nextTick(() => {
    if (!popupRef.value || !buttonRef.value || !isOpen.value) return;
    const newPositionStyles = calculatePosition({
      triggerElement: buttonRef.value,
      popupElement: popupRef.value,
      pickerPosition: props.pickerPosition,
      isMobile: false,
    });
    Object.assign(positionStyles, newPositionStyles);
  });
}

// Event Handlers
function togglePicker() {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    stopAllSelections();
  }
  updatePosition();
}

function handleMouseLeave(event: MouseEvent) {
  const pickerElement = document.querySelector('.color-picker-popup');
  if (pickerElement && !pickerElement.contains(event.relatedTarget as Node)) {
    stopAllSelections();
  }
}

function stopAllSelections() {
  if (isColorSelecting.value) {
    isColorSelecting.value = false;
  }
  if (isHueSelecting.value) {
    isHueSelecting.value = false;
  }
  if (isAlphaSelecting.value) {
    isAlphaSelecting.value = false;
  }
}

// Color Selection Methods
function startColorSelection(event: MouseEvent | TouchEvent) {
  if (!colorArea.value) return;
  isColorSelecting.value = true;
  if (isInitiallyUndefined.value || (colorState.rgb.r === 0 && colorState.rgb.g === 0 && colorState.rgb.b === 0 && colorState.alpha === 0)) {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  const throttledUpdate = throttle(emitColorChange, 30);
  let animationFrameId: number;

  const handleColorUpdate = (e: MouseEvent | TouchEvent) => {
    if (!isColorSelecting.value || !colorArea.value) return;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const rect = colorArea.value!.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

      colorState.hsb.s = Math.round(x);
      colorState.hsb.b = Math.round(100 - y);

      const rgb = colorUtils.hsbToRgb(colorState.hsb.h, colorState.hsb.s, colorState.hsb.b);
      colorState.rgb = rgb;
      colorState.hex = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);

      tempValues.rgb = { ...colorState.rgb };
      tempValues.hsb = { ...colorState.hsb };
      tempValues.hex = colorState.hex;

      throttledUpdate();
    });
  };

  const stopSelection = () => {
    isColorSelecting.value = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    document.removeEventListener('mousemove', handleColorUpdate);
    document.removeEventListener('mouseup', stopSelection);
    document.removeEventListener('touchmove', handleColorUpdate);
    document.removeEventListener('touchend', stopSelection);
    emitColorChange();
  };

  document.addEventListener('mousemove', handleColorUpdate);
  document.addEventListener('mouseup', stopSelection);
  document.addEventListener('touchmove', handleColorUpdate);
  document.addEventListener('touchend', stopSelection);
  handleColorUpdate(event);
}

function startHueSelection(event: MouseEvent | TouchEvent) {
  if (!hueSlider.value) return;
  isHueSelecting.value = true;
  if (isInitiallyUndefined.value || (colorState.rgb.r === 0 && colorState.rgb.g === 0 && colorState.rgb.b === 0 && colorState.alpha === 0)) {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  const throttledUpdate = throttle(emitColorChange, 30);

  const handleHueUpdate = (e: MouseEvent | TouchEvent) => {
    if (!isHueSelecting.value) return;
    requestAnimationFrame(() => {
      const rect = hueSlider.value!.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      colorState.hsb.h = Math.round(x * 3.6);

      const rgb = colorUtils.hsbToRgb(colorState.hsb.h, colorState.hsb.s, colorState.hsb.b);
      colorState.rgb = rgb;
      colorState.hex = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);

      tempValues.rgb = { ...colorState.rgb };
      tempValues.hsb = { ...colorState.hsb };
      tempValues.hex = colorState.hex;

      throttledUpdate();
    });
  };

  const stopSelection = () => {
    isHueSelecting.value = false;
    document.removeEventListener('mousemove', handleHueUpdate);
    document.removeEventListener('mouseup', stopSelection);
    document.removeEventListener('touchmove', handleHueUpdate);
    document.removeEventListener('touchend', stopSelection);
    emitColorChange();
  };

  document.addEventListener('mousemove', handleHueUpdate);
  document.addEventListener('mouseup', stopSelection);
  document.addEventListener('touchmove', handleHueUpdate);
  document.addEventListener('touchend', stopSelection);
  handleHueUpdate(event);
}

function startAlphaSelection(event: MouseEvent | TouchEvent) {
  if (!alphaSlider.value) return;
  isAlphaSelecting.value = true;
  if (isInitiallyUndefined.value) {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;

  const throttledUpdate = throttle(emitColorChange, 30);
  let animationFrameId: number;

  const handleAlphaUpdate = (e: MouseEvent | TouchEvent) => {
    if (!isAlphaSelecting.value) return;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const rect = alphaSlider.value!.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      colorState.alpha = Math.round(x);
      throttledUpdate();
    });
  };

  const stopSelection = () => {
    isAlphaSelecting.value = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    document.removeEventListener('mousemove', handleAlphaUpdate);
    document.removeEventListener('mouseup', stopSelection);
    document.removeEventListener('touchmove', handleAlphaUpdate);
    document.removeEventListener('touchend', stopSelection);
    emitColorChange();
  };

  document.addEventListener('mousemove', handleAlphaUpdate);
  document.addEventListener('mouseup', stopSelection);
  document.addEventListener('touchmove', handleAlphaUpdate);
  document.addEventListener('touchend', stopSelection);
  handleAlphaUpdate(event);
}

// Input Handlers
function handleHexInput(event: Event) {
  const input = event.target as HTMLInputElement;
  tempValues.hex = input.value;

  if (!/^#?[0-9a-fA-F]*$/.test(input.value)) {
    input.value = tempValues.hex.replace(/[^#0-9a-fA-F]/g, '');
    return;
  }

  if (input.value.length > MAX_HEX_LENGTH) {
    input.value = input.value.slice(0, MAX_HEX_LENGTH);
  }
}

function handleHexBlur(event: Event) {
  const input = event.target as HTMLInputElement;
  const newHex = colorUtils.completeHex(input.value);

  if (colorUtils.isValidHex(newHex)) {
    if (isInitiallyUndefined.value || (colorState.rgb.r === 0 && colorState.rgb.g === 0 && colorState.rgb.b === 0 && colorState.alpha === 0)) {
      colorState.alpha = 100;
    }
    isInitiallyUndefined.value = false;
    colorState.hex = newHex;
    const rgb = colorUtils.hexToRgb(newHex);
    if (rgb) {
      colorState.rgb = rgb;
      colorState.hsb = colorUtils.rgbToHsb(rgb.r, rgb.g, rgb.b);
      emitColorChange();
    }
  }

  input.value = colorState.hex.replace('#', '');
}

function handleRgbInput(channel: 'r' | 'g' | 'b', event: Event) {
  const input = event.target as HTMLInputElement;
  const value = Math.min(MAX_RGB_VALUE, Math.max(0, parseInt(input.value) || 0));
  tempValues.rgb[channel] = value;
}

function handleRgbBlur() {
  if (isInitiallyUndefined.value || (colorState.rgb.r === 0 && colorState.rgb.g === 0 && colorState.rgb.b === 0 && colorState.alpha === 0)) {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  const { r, g, b } = tempValues.rgb;
  colorState.rgb = { r, g, b };
  colorState.hex = colorUtils.rgbToHex(r, g, b);
  colorState.hsb = colorUtils.rgbToHsb(r, g, b);
  emitColorChange();
}

function handleHsbInput(channel: 'h' | 's' | 'b', event: Event) {
  const input = event.target as HTMLInputElement;
  const value = Math.min(MAX_HSB_VALUES[channel], Math.max(0, parseInt(input.value) || 0));
  tempValues.hsb[channel] = value;
}

function handleHsbBlur() {
  if (isInitiallyUndefined.value || (colorState.rgb.r === 0 && colorState.rgb.g === 0 && colorState.rgb.b === 0 && colorState.alpha === 0)) {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  const { h, s, b } = tempValues.hsb;
  colorState.hsb = { h, s, b };
  const rgb = colorUtils.hsbToRgb(h, s, b);
  colorState.rgb = rgb;
  colorState.hex = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
  emitColorChange();
}

function handleAlphaInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.value.length > MAX_ALPHA_LENGTH) {
    input.value = input.value.slice(0, MAX_ALPHA_LENGTH);
  }
}

function handleAlphaBlur(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value) || 0;
  const clampedValue = Math.min(100, Math.max(0, value));

  if (value !== clampedValue) {
    input.value = clampedValue.toString();
  }

  colorState.alpha = clampedValue;
  emitColorChange();
}

// Color Management Methods
function emitColorChange() {
  modelValue.value = outputColor.value;
}

function selectSuggestedColor(color: string) {
  if (isInitiallyUndefined.value && color !== 'transparent') {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  if (color === 'transparent') {
    colorState.rgb = { r: 0, g: 0, b: 0 };
    colorState.hex = '#000000';
    colorState.hsb = { h: 0, s: 0, b: 0 };
    colorState.alpha = 0;

    tempValues.rgb = { ...colorState.rgb };
    tempValues.hsb = { ...colorState.hsb };
    tempValues.hex = colorState.hex;
  } else {
    const hex = color.startsWith('#') ? color : `#${color}`;
    const rgb = colorUtils.hexToRgb(hex);
    if (rgb) {
      colorState.rgb = rgb;
      colorState.hex = hex;
      colorState.hsb = colorUtils.rgbToHsb(rgb.r, rgb.g, rgb.b);
      colorState.alpha = 100;

      tempValues.rgb = { ...colorState.rgb };
      tempValues.hsb = { ...colorState.hsb };
      tempValues.hex = hex;
    }
  }
  emitColorChange();
}

async function activateEyeDropper() {
  if (!isEyeDropperSupported.value) return;
  try {
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open();

    const colorValue = result.sRGBHex;
    const rgb = colorUtils.hexToRgb(colorValue);

    if (rgb) {
      colorState.rgb = rgb;
      colorState.hex = colorValue;
      colorState.hsb = colorUtils.rgbToHsb(rgb.r, rgb.g, rgb.b);
      colorState.alpha = 100;

      tempValues.rgb = { ...colorState.rgb };
      tempValues.hsb = { ...colorState.hsb };
      tempValues.hex = colorValue;

      isInitiallyUndefined.value = false;
      emitColorChange();
    }
  } catch {
    // Silently handle the error since EyeDropper is an optional feature
  }
}
</script>

<style lang="scss" scoped src="./ColorPicker.style.scss"></style>
