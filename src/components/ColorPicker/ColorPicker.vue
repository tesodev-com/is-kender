<template>
  <div class="color-picker-container">
    <div ref="buttonRef">
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
        ref="popupRef"
        class="color-picker-popup"
        :class="{ draggable: props.isDraggable, 'is-dragging': isDragging }"
        :style="props.isDraggable ? draggableStyle : positionStyles"
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
          <!-- Renk seçim alanı -->
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

          <!-- Renk formatı seçimi -->
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
declare global {
  interface Window {
    EyeDropper: {
      new (): {
        open(): Promise<{ sRGBHex: string }>;
      };
    };
  }
}
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, useTemplateRef, watch } from 'vue';

import { colorizeIcon } from '@/assets/icons';
import { Button, Svg, Text } from '@/components/';
import useClickOutside from '@/composables/useClickOutside';
import useDraggable from '@/composables/useDraggable';
import { calculatePosition } from '@/utils/position';
import type { ColorPickerProps } from './types';

// Use defineModel for two-way binding
const modelValue = defineModel<string | undefined>('modelValue', { default: undefined });

// Define props without modelValue (it's handled by defineModel)
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

// Picker durumu
const isOpen = ref(false);

const isInitiallyUndefined = ref(modelValue.value === undefined);

// Renk formatı seçenekleri
const colorFormats = computed(() => props.colorFormats);
const currentFormat = ref(props.colorFormats[0]);

// Renk değerleri için state
const colorState = reactive({
  hex: '#000000',
  rgb: { r: 0, g: 0, b: 0 },
  hsb: { h: 0, s: 0, b: 0 },
  alpha: 0,
  saturation: 0,
  brightness: 0,
});

// Geçici input değerleri
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

// Renk dönüşüm yardımcı fonksiyonları
const colorUtils = {
  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  rgbToHex(r: number, g: number, b: number) {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  rgbToHsb(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      b: Math.round(v * 100),
    };
  },

  hsbToRgb(h: number, s: number, v: number) {
    h = (h % 360) / 360;
    s = Math.min(100, Math.max(0, s)) / 100;
    v = Math.min(100, Math.max(0, v)) / 100;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0,
      g = 0,
      b = 0;

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  },

  isValidHex(hex: string) {
    return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(hex);
  },

  completeHex(input: string): string {
    let hex = input.replace(/#/g, '').trim().toLowerCase();
    hex = hex.replace(/[^0-9a-f]/g, '');

    if (hex.length >= 6) {
      return '#' + hex.slice(0, 6);
    }

    if (hex.length >= 3) {
      const shorthand = hex.slice(0, 3);
      return (
        '#' +
        shorthand
          .split('')
          .map(c => c + c)
          .join('')
      );
    }

    return colorState.hex;
  },
};

// Input handlers
const handleHexInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  tempValues.hex = input.value;

  // Sadece geçerli hex karakterlerine izin ver
  if (!/^#?[0-9a-fA-F]*$/.test(input.value)) {
    input.value = tempValues.hex.replace(/[^#0-9a-fA-F]/g, '');
    return;
  }

  // Maksimum uzunluk kontrolü
  if (input.value.length > 7) {
    input.value = input.value.slice(0, 7);
  }
};

const handleHexBlur = (event: Event) => {
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

  // Input değerini normalize et
  input.value = colorState.hex.replace('#', '');
};

const handleRgbInput = (channel: 'r' | 'g' | 'b', event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = Math.min(255, Math.max(0, parseInt(input.value) || 0));
  tempValues.rgb[channel] = value;
};

const handleRgbBlur = () => {
  if (isInitiallyUndefined.value || (colorState.rgb.r === 0 && colorState.rgb.g === 0 && colorState.rgb.b === 0 && colorState.alpha === 0)) {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  const { r, g, b } = tempValues.rgb;
  colorState.rgb = { r, g, b };
  colorState.hex = colorUtils.rgbToHex(r, g, b);
  colorState.hsb = colorUtils.rgbToHsb(r, g, b);
  emitColorChange();
};

const handleHsbInput = (channel: 'h' | 's' | 'b', event: Event) => {
  const input = event.target as HTMLInputElement;
  const maxValues = { h: 360, s: 100, b: 100 };
  const value = Math.min(maxValues[channel], Math.max(0, parseInt(input.value) || 0));
  tempValues.hsb[channel] = value;
};

const handleHsbBlur = () => {
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
};

const handleAlphaInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  // Sadece 3 karaktere izin ver
  if (input.value.length > 3) {
    input.value = input.value.slice(0, 3);
  }
};

const handleAlphaBlur = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value) || 0;
  const clampedValue = Math.min(100, Math.max(0, value));

  // Eğer geçersiz bir değer girilmişse input değerini düzelt
  if (value !== clampedValue) {
    input.value = clampedValue.toString();
  }

  colorState.alpha = clampedValue;
  emitColorChange();
};

const emitColorChange = () => {
  modelValue.value = outputColor.value;
};

// İlk yükleme - gelen değeri parse et
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

// Computed değerler
const outputColor = computed(() => {
  if (isInitiallyUndefined.value) return undefined;
  const { r, g, b } = colorState.rgb;
  const a = colorState.alpha / 100;

  // Transparent renk için özel durum
  if (a === 0) return 'rgba(0, 0, 0, 0)';

  // Normal renk durumu
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

// Slider pozisyonları için computed değerler
const sliderPositions = computed(() => ({
  hue: (colorState.hsb.h / 360) * 100,
  saturation: colorState.hsb.s,
  brightness: colorState.hsb.b,
  alpha: colorState.alpha,
}));

// Model değişikliklerini izle
watch(
  () => modelValue.value,
  newValue => {
    if (newValue !== outputColor.value) {
      parseInitialColor();
    }
  },
  { immediate: true }
);

// DOM referansları
const colorArea = ref<HTMLElement | null>(null);
const hueSlider = ref<HTMLElement | null>(null);
const alphaSlider = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

// Mouse seçim durumları
const isColorSelecting = ref(false);
const isHueSelecting = ref(false);
const isAlphaSelecting = ref(false);

// Picker pozisyonu için referans
const buttonRef = useTemplateRef<HTMLElement | null>('buttonRef');
const popupRef = useTemplateRef<HTMLElement | null>('popupRef');

useClickOutside([popupRef, buttonRef], () => {
  if (isOpen.value) {
    isOpen.value = false;
    stopAllSelections();
  }
});

const { style: draggableStyle, isDragging } = useDraggable(popupRef, {
  initialValue: props.initialPosition,
  containerElement: bodyRef,
  handle: headerRef,
  preventDefault: true,
});

const updatePosition = () => {
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
};

// Throttle fonksiyonu ekleyelim
const throttle = <T extends (...args: any[]) => void>(func: T, limit: number): T => {
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
};

// Tüm seçim işlemlerini durdur
const stopAllSelections = () => {
  if (isColorSelecting.value) {
    isColorSelecting.value = false;
  }
  if (isHueSelecting.value) {
    isHueSelecting.value = false;
  }
  if (isAlphaSelecting.value) {
    isAlphaSelecting.value = false;
  }
};

// Mouse popup dışına çıktığında kontrol et
const handleMouseLeave = (event: MouseEvent) => {
  const pickerElement = document.querySelector('.color-picker-popup');
  if (pickerElement && !pickerElement.contains(event.relatedTarget as Node)) {
    stopAllSelections();
  }
};

// İlk yükleme ve temizleme
onMounted(() => {
  bodyRef.value = document.body as HTMLElement;
  document.addEventListener('mouseup', stopAllSelections);
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);

  parseInitialColor();

  // EyeDropper API desteğini kontrol et
  isEyeDropperSupported.value = typeof window !== 'undefined' && 'EyeDropper' in window;
});

onUnmounted(() => {
  document.removeEventListener('mouseup', stopAllSelections);
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);

  stopAllSelections();
});

// Picker'ı aç/kapat
const togglePicker = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    stopAllSelections();
  }
  updatePosition();
};

// Renk seçim alanı için fare kontrolleri
const startColorSelection = (event: MouseEvent | TouchEvent) => {
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

      // tempValues'ı güncelle
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
};

// Hue slider için fare kontrolleri
const startHueSelection = (event: MouseEvent | TouchEvent) => {
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

      // tempValues'ı güncelle
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
};

// Alpha slider için fare kontrolleri
const startAlphaSelection = (event: MouseEvent | TouchEvent) => {
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
};

// Önerilen renkler
const suggestedColors = computed(() => props.suggestedColors);

const selectSuggestedColor = (color: string) => {
  if (isInitiallyUndefined.value && color !== 'transparent') {
    colorState.alpha = 100;
  }
  isInitiallyUndefined.value = false;
  if (color === 'transparent') {
    // Tüm değerleri sıfırla
    colorState.rgb = { r: 0, g: 0, b: 0 };
    colorState.hex = '#000000';
    colorState.hsb = { h: 0, s: 0, b: 0 };
    colorState.alpha = 0;

    // tempValues'ı da güncelle
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

      // tempValues'ı güncelle
      tempValues.rgb = { ...colorState.rgb };
      tempValues.hsb = { ...colorState.hsb };
      tempValues.hex = hex;
    }
  }
  emitColorChange();
};

// EyeDropper API için destek kontrolü
const isEyeDropperSupported = ref(false);

const activateEyeDropper = async () => {
  if (!isEyeDropperSupported.value) return;
  try {
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open();

    // Seçilen rengi uygula
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
};
</script>

<style lang="scss" scoped src="./ColorPicker.style.scss"></style>
