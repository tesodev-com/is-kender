<template>
  <div
    ref="selectContainer"
    class="select-container"
  >
    <div
      v-if="label"
      class="select-label-container"
    >
      <p @click="handleLabelClick">
        {{ label }}
      </p>
      <span
        v-if="required"
        class="select-label-required"
      >
        *
      </span>
    </div>
    <div
      ref="selectTrigger"
      class="select-trigger"
      :class="[{ 'select-trigger-open': isOpen, 'select-trigger-disabled': disabled }]"
      tabindex="0"
      @click="toggleDropdown"
    >
      <BaseSvg
        v-if="leftIcon"
        :src="leftIcon"
        size="20"
        class="select-trigger-left-icon"
      />
      <p
        class="select-trigger-value"
        :class="[{ 'select-trigger-value-selected': hasSelectedValue }]"
      >
        {{ computePlaceholder }}
      </p>
      <Svg
        :src="arrowDownIcon"
        size="20"
        class="select-trigger-arrow"
        :class="[{ 'select-trigger-arrow-open': isOpen }]"
      />
    </div>
    <transition name="select-fade">
      <ul
        v-if="isOpen"
        ref="dropdown"
        class="select-dropdown"
        :style="dropdownPosition"
      >
        <template v-if="!options.length">
          <li class="select-dropdown-no-content">
            <p>No options available</p>
          </li>
        </template>
        <template v-else>
          <li
            v-for="option in options"
            :key="option.value"
            class="select-dropdown-item"
            :class="[{ 'select-dropdown-item-selected': isSelected(option.value), 'select-dropdown-item-disabled': option.disabled }]"
            @click="selectOption(option)"
          >
            <div
              v-if="option.slotKey"
              class="select-dropdown-item-label"
            >
              <slot
                :name="option.slotKey"
                v-bind="option"
              />
            </div>
            <p
              v-else
              class="select-dropdown-item-label"
            >
              {{ option.label }}
            </p>
            <Svg
              v-if="isSelected(option.value)"
              :src="checkIcon"
              size="20"
              class="select-dropdown-item-icon"
              :class="[{ 'select-dropdown-item-icon-disabled': option.disabled }]"
            />
          </li>
        </template>
      </ul>
    </transition>
    <div
      v-if="hint || $slots.hint"
      class="select-hint"
    >
      <template v-if="$slots.hint">
        <slot name="hint" />
      </template>
      <template v-else>
        {{ hint }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Svg from 'library/Svg';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { arrowDownIcon, checkIcon } from '@/assets/icons';
import type { SelectOption, SelectProps } from 'library/Select';
import BaseSvg from 'library/Svg';
import { calculateDropdownPosition, type PositionStyle } from '@/utils/calculatePosition';

const props = withDefaults(defineProps<SelectProps>(), {
  isMultiple: false,
  optionsPosition: 'bottom',
  optionsOffset: 4,
});

const model = defineModel<string | number | null>();
const modelMultiple = defineModel<(string | number)[]>('multiple', { default: () => [] });
const isOpen = ref<boolean>(false);
const selectContainer = ref<HTMLElement | null>(null);
const selectTrigger = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLUListElement | null>(null);
const dropdownPosition = ref<PositionStyle>({ top: '0px', left: '0px', width: '0px' });

const selectedValue = computed(() => {
  if (props.isMultiple) {
    const selected = props.options.filter(opt => modelMultiple.value.includes(opt.value));
    return selected.length > 0 ? selected.map(opt => opt.label).join(', ') : '';
  } else {
    const selected = props.options.find(opt => opt.value === model.value);
    return selected ? selected.label : '';
  }
});

const hasSelectedValue = computed(() => (props.isMultiple ? modelMultiple.value.length > 0 : !!model.value));

const computePlaceholder = computed(() => {
  return selectedValue.value || props.placeholder || '';
});

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('resize', handleResize);
});

function selectOption(option: SelectOption) {
  if (option.disabled) return;

  if (props.isMultiple) {
    const values = modelMultiple.value;
    const index = values.indexOf(option.value);
    if (index === -1) {
      modelMultiple.value = [...values, option.value];
    } else {
      modelMultiple.value = values.filter(val => val !== option.value);
    }
  } else {
    model.value = option.value;
    isOpen.value = false;
  }
}

function isSelected(value: string | number) {
  return props.isMultiple ? modelMultiple.value.includes(value) : model.value === value;
}

async function updateDropdownPosition() {
  await nextTick();

  if (!selectContainer.value || !selectTrigger.value || !dropdown.value || !isOpen.value) return;

  const containerRect = selectContainer.value.getBoundingClientRect();
  const triggerRect = selectTrigger.value.getBoundingClientRect();
  const dropdownRect = dropdown.value.getBoundingClientRect();

  console.log({ containerRect, triggerRect, dropdownRect });

  dropdownPosition.value = calculateDropdownPosition(containerRect, triggerRect, dropdownRect, {
    preferredPosition: props.optionsPosition,
    offset: props.optionsOffset,
  });

  scrollToSelectedItem();
}

function toggleDropdown() {
  if (props.disabled) return;

  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownPosition();
    scrollToSelectedItem();
    selectTrigger.value?.focus();
  }
}

function scrollToSelectedItem() {
  if (props.isMultiple || !model.value || !dropdown.value) return;

  nextTick(() => {
    const selectedElement = dropdown.value?.querySelector(`.select-dropdown-item.select-dropdown-item-selected`);

    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
}

function handleOutsideClick(event: MouseEvent) {
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node) && dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

function handleLabelClick() {
  selectTrigger.value?.focus();
  toggleDropdown();
}

function handleResize() {
  if (isOpen.value) {
    updateDropdownPosition();
  }
}
</script>

<style lang="scss" scoped src="./Select.style.scss"></style>
