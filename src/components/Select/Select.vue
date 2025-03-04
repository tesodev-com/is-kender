<template>
  <div
    ref="selectContainer"
    class="select-container"
  >
    <div
      v-if="label"
      class="select-label-container"
    >
      <label
        :for="selectId"
        @click="handleLabelClick"
      >
        {{ label }}
      </label>
      <span
        v-if="required"
        class="select-label-required"
      >
        *
      </span>
    </div>
    <div
      :id="selectId"
      ref="selectTrigger"
      class="select-trigger"
      :class="[{ 'select-trigger-open': isOpen, 'select-trigger-disabled': disabled }]"
      tabindex="0"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="`${selectId}-dropdown`"
      @click="toggleDropdown"
      @keydown="handleKeydown"
    >
      <Svg
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
    <Teleport to="body">
      <transition name="select-fade">
        <ul
          v-if="isOpen"
          :id="`${selectId}-dropdown`"
          ref="dropdown"
          class="select-dropdown"
          :style="dropdownPosition"
          role="listbox"
          tabindex="-1"
          @click="handleDropdownClick"
        >
          <template v-if="isSearch && options.length > 0">
            <input
              ref="searchInput"
              v-model="searchModel"
              placeholder="Search..."
              class="select-dropdown-search"
              tabindex="0"
              @keydown="handleSearchKeydown"
            />
          </template>
          <template v-if="!searchFilterList.length">
            <li class="select-dropdown-no-content">
              <p>No options available</p>
            </li>
          </template>
          <template v-else>
            <li
              v-for="(option, index) in searchFilterList"
              :key="option.value"
              class="select-dropdown-item"
              :class="[
                {
                  'select-dropdown-item-selected': isSelected(option.value),
                  'select-dropdown-item-disabled': option.disabled,
                  'select-dropdown-item-focused': focusedIndex === index && !option.disabled,
                },
              ]"
              role="option"
              :aria-selected="isSelected(option.value)"
              :aria-disabled="option.disabled"
              @click="selectOption(option)"
              @mouseover="focusedIndex = index"
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
    </Teleport>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, useTemplateRef } from 'vue';
import { arrowDownIcon, checkIcon } from '@/assets/icons';
import type { SelectOption, SelectProps } from 'library/Select';
import { calculateElementPosition, type PositionStyle } from '@/utils/calculatePosition';

const props = withDefaults(defineProps<SelectProps>(), {
  isMultiple: false,
  optionsPosition: 'bottom',
  optionsOffset: 4,
  isSearch: false,
});

const selectId = useId();

const model = defineModel<string | null>();
const modelMultiple = defineModel<string[]>('multiple', { default: () => [] });
const searchModel = defineModel<string>('search', { default: '' });
const selectContainer = useTemplateRef('selectContainer');
const selectTrigger = useTemplateRef('selectTrigger');
const dropdown = useTemplateRef('dropdown');
const searchInput = useTemplateRef('searchInput');
const isOpen = ref<boolean>(false);
const dropdownPosition = ref<PositionStyle>({ top: '0px', left: '0px', width: '0px' });
const focusedIndex = ref<number>(-1);

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

const searchFilterList = computed(() => {
  if (props.isSearch && searchModel.value) {
    return props.options.filter(option => option.label.toLowerCase().includes(searchModel.value.toLowerCase()));
  }
  return props.options;
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

  const optionIndex = searchFilterList.value.findIndex(opt => opt.value === option.value);

  if (props.isMultiple) {
    const values = modelMultiple.value;
    const index = values.indexOf(option.value);
    if (index === -1) {
      modelMultiple.value = [...values, option.value];
      focusedIndex.value = optionIndex;
    } else {
      modelMultiple.value = values.filter(val => val !== option.value);
      focusedIndex.value = optionIndex;
    }
  } else {
    model.value = option.value;
    focusedIndex.value = optionIndex;
    isOpen.value = false;
  }
}

function isSelected(value: string) {
  return props.isMultiple ? modelMultiple.value.includes(value) : model.value === value;
}

async function updateDropdownPosition() {
  await nextTick();

  if (!selectContainer.value || !selectTrigger.value || !dropdown.value || !isOpen.value) return;

  dropdownPosition.value = calculateElementPosition(selectContainer.value, selectTrigger.value, dropdown.value, {
    preferredPosition: props.optionsPosition,
    offset: props.optionsOffset,
  });

  scrollToSelectedItem();
}

function toggleDropdown() {
  if (props.disabled) return;

  isOpen.value = !isOpen.value;
  searchModel.value = '';
  if (isOpen.value) {
    updateDropdownPosition();
    if (props.isMultiple && modelMultiple.value.length > 0) {
      focusedIndex.value = searchFilterList.value.findIndex(opt => opt.value === modelMultiple.value[0]);
    } else if (!props.isMultiple && model.value) {
      focusedIndex.value = searchFilterList.value.findIndex(opt => opt.value === model.value);
    } else {
      focusedIndex.value = getNextEnabledOption(-1, 1);
    }
    if (focusedIndex.value === -1) focusedIndex.value = 0;

    nextTick(() => {
      if (props.isSearch && searchInput.value) {
        searchInput.value.focus();
      } else {
        selectTrigger.value?.focus();
      }
    });
  } else {
    focusedIndex.value = -1;
  }
}

function handleDropdownClick(event: MouseEvent) {
  if (event.target === dropdown.value) {
    selectTrigger.value?.focus();
  }
}

function scrollToSelectedItem() {
  if (!dropdown.value) return;

  nextTick(() => {
    const selectedElement = dropdown.value?.querySelector(`.select-dropdown-item.select-dropdown-item-selected`);

    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: 'nearest',
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

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || !searchFilterList.value.length) return;

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (!isOpen.value) {
        toggleDropdown();
      } else if (focusedIndex.value >= 0 && focusedIndex.value < searchFilterList.value.length) {
        selectOption(searchFilterList.value[focusedIndex.value]);
      }
      break;
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        toggleDropdown();
      } else {
        moveFocus(1);
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (!isOpen.value) {
        toggleDropdown();
      } else {
        moveFocus(-1);
      }
      break;
    case 'Escape':
      if (isOpen.value) {
        isOpen.value = false;
        focusedIndex.value = -1;
        selectTrigger.value?.focus();
      }
      break;
    case 'Tab':
      if (isOpen.value) {
        event.preventDefault();
        if (props.isSearch && searchInput.value) {
          searchInput.value.focus();
        } else {
          selectTrigger.value?.focus();
        }
      }
      break;
  }
}

function handleSearchKeydown(event: KeyboardEvent) {
  if (props.disabled || !searchFilterList.value.length) return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      moveFocus(1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      moveFocus(-1);
      break;
    case 'Enter':
      event.preventDefault();
      if (focusedIndex.value >= 0 && focusedIndex.value < searchFilterList.value.length) {
        selectOption(searchFilterList.value[focusedIndex.value]);
      }
      break;
    case 'Escape':
      event.preventDefault();
      isOpen.value = false;
      focusedIndex.value = -1;
      selectTrigger.value?.focus();
      break;
    case 'Tab':
      event.preventDefault();
      selectTrigger.value?.focus();
      break;
  }
}

function moveFocus(direction: number) {
  if (!searchFilterList.value.length) return;

  const currentIndex = focusedIndex.value < 0 ? -1 : focusedIndex.value;
  const newIndex = getNextEnabledOption(currentIndex, direction);

  if (newIndex !== currentIndex && newIndex >= 0 && newIndex < searchFilterList.value.length) {
    focusedIndex.value = newIndex;
    scrollToFocusedItem();
  }
}

function getNextEnabledOption(currentIndex: number, direction: number): number {
  const options = searchFilterList.value;
  if (!options?.length) return -1;

  let newIndex = currentIndex + direction;
  const maxIndex = options.length - 1;

  if (newIndex < 0) newIndex = maxIndex;
  if (newIndex > maxIndex) newIndex = 0;

  const startIndex = newIndex;
  for (let i = 0; i < options.length; i++) {
    if (!options[newIndex].disabled) return newIndex;
    newIndex = (newIndex + direction + options.length) % options.length;
    if (newIndex === startIndex) break;
  }

  return -1;
}

function scrollToFocusedItem() {
  nextTick(() => {
    if (dropdown.value && focusedIndex.value >= 0 && focusedIndex.value < searchFilterList.value.length) {
      const focusedElement = dropdown.value.querySelectorAll('.select-dropdown-item')[focusedIndex.value] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: 'nearest',
        });
      }
    }
  });
}
</script>

<style lang="scss" scoped src="./Select.style.scss"></style>
