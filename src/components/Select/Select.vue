<template>
  <div
    ref="selectContainerRef"
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
        {{ props.requiredIndicator || '*' }}
      </span>
    </div>
    <div
      :id="selectId"
      ref="selectTriggerRef"
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
      ></Svg>
      <p
        class="select-trigger-value"
        :class="[{ 'select-trigger-value-selected': hasSelectedValue }]"
      >
        {{ computePlaceholder }}
      </p>
      <Svg
        :src="keyboardArrowDownIcon"
        size="20"
        class="select-trigger-arrow"
        :class="[{ 'select-trigger-arrow-open': isOpen }]"
      ></Svg>
    </div>
    <Teleport to="body">
      <transition name="select-fade">
        <div
          v-if="isOpen"
          :id="`${selectId}-dropdown`"
          ref="dropdownRef"
          class="select-dropdown"
          :style="dropdownPosition"
          @click="handleDropdownClick"
        >
          <input
            v-if="isSearch && options.length > 0"
            v-model="searchModel"
            :placeholder="props.searchPlaceholder || 'Search...'"
            class="select-dropdown-search"
            @keydown="handleSearchKeydown"
          />
          <template v-if="!searchFilterList.length">
            <li class="select-dropdown-no-content">
              <p>{{ props.noOptionsText || 'No options available' }}</p>
            </li>
          </template>
          <div
            v-else-if="props.virtualScroll"
            class="select-dropdown-options-container"
            @scroll="handleScroll"
          >
            <div
              class="virtual-list"
              role="listbox"
              tabindex="-1"
              :style="{ height: `${virtualListHeight}px` }"
            >
              <li
                v-for="(option, index) in visibleOptions"
                :key="option[useValue]"
                class="select-dropdown-item"
                :style="getItemStyle(index)"
                :class="getItemClasses(option, index + startIndex)"
                role="option"
                :aria-selected="isSelected(option[useValue])"
                :aria-disabled="option.disabled"
                @click="selectOption(option)"
                @mouseover="handleMouseover(index + startIndex)"
              >
                <div
                  v-if="slots['option'] || slots[`option-${option.slotKey}`]"
                  class="select-dropdown-item-label"
                >
                  <slot
                    v-if="slots['option']"
                    name="option"
                    v-bind="option"
                  />
                  <slot
                    v-else
                    :name="`option-${option.slotKey}`"
                    v-bind="option"
                  />
                </div>
                <p
                  v-else
                  class="select-dropdown-item-label"
                >
                  {{ option[useLabel] }}
                </p>
                <Svg
                  v-if="isSelected(option[useValue])"
                  :src="checkIcon"
                  size="20"
                  class="select-dropdown-item-icon"
                  :class="[{ 'select-dropdown-item-icon-disabled': option.disabled }]"
                ></Svg>
              </li>
            </div>
          </div>
          <ul
            v-else
            class="select-list"
            role="listbox"
            tabindex="-1"
          >
            <li
              v-for="(option, index) in searchFilterList"
              :key="option[useValue]"
              class="select-dropdown-item"
              :class="getItemClasses(option, index)"
              role="option"
              :aria-selected="isSelected(option[useValue])"
              :aria-disabled="option.disabled"
              @click="selectOption(option)"
              @mouseover="handleMouseover(index)"
            >
              <div
                v-if="slots['option'] || slots[`option-${option.slotKey}`]"
                class="select-dropdown-item-label"
              >
                <slot
                  v-if="slots['option']"
                  name="option"
                  v-bind="option"
                />
                <slot
                  v-else
                  :name="`option-${option.slotKey}`"
                  v-bind="option"
                />
              </div>
              <p
                v-else
                class="select-dropdown-item-label"
              >
                {{ option[useLabel] }}
              </p>
              <Svg
                v-if="isSelected(option[useValue])"
                :src="checkIcon"
                size="20"
                class="select-dropdown-item-icon"
                :class="[{ 'select-dropdown-item-icon-disabled': option.disabled }]"
              ></Svg>
            </li>
          </ul>
        </div>
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
// imports
import { checkIcon, keyboardArrowDownIcon } from '@/assets/icons';
import { calculateElementPosition, type PositionStyle } from '@/utils/calculatePosition';
import Svg from 'library-components/Svg';
import { computed, type CSSProperties, nextTick, onBeforeUnmount, onMounted, ref, useId, useTemplateRef, watch } from 'vue';
import type { SelectEmits, SelectOption, SelectProps, SelectSlots } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<SelectProps>(), {
  isMultiple: false,
  optionsPosition: 'bottom',
  optionsOffset: 4,
  isSearch: false,
  itemHeight: 40,
  virtualScroll: false,
  virtualScrollBuffer: 3,
  requiredIndicator: '*',
  noOptionsText: 'No options available',
  searchPlaceholder: 'Search...',
  useValue: 'value',
  useLabel: 'label',
});

// defineEmits
const emit = defineEmits<SelectEmits>();
// defineSlots
const slots = defineSlots<SelectSlots>();

// defineModel
const model = defineModel<string | null>();
const modelMultiple = defineModel<string[]>('multiple', { default: () => [] });
const searchModel = defineModel<string>('search', { default: '' });

// states (refs and reactives)
const selectId = useId();
const selectContainer = useTemplateRef('selectContainerRef');
const selectTrigger = useTemplateRef('selectTriggerRef');
const dropdown = useTemplateRef('dropdownRef');
const isOpen = ref<boolean>(false);
const dropdownPosition = ref<PositionStyle>({
  top: '0px',
  left: '0px',
  width: '0px',
});
const focusedIndex = ref<number>(-1);
const startIndex = ref(0);
const visibleCount = ref(0);

// computed
const selectedValue = computed(() => {
  if (props.isMultiple) {
    const selected = props.options.filter(opt => modelMultiple.value.includes(opt[props.useValue]));
    return selected.length > 0 ? selected.map(opt => opt[props.useLabel]).join(', ') : '';
  } else {
    const selected = props.options.find(opt => opt[props.useValue] === model.value);
    return selected ? selected[props.useLabel] : '';
  }
});

const hasSelectedValue = computed(() => (props.isMultiple ? modelMultiple.value.length > 0 : !!model.value));

const computePlaceholder = computed(() => {
  return selectedValue.value || props.placeholder || '';
});

const searchFilterList = computed(() => {
  if (props.isSearch && searchModel.value) {
    return props.options.filter(option => option[props.useLabel].toLowerCase().includes(searchModel.value.toLowerCase()));
  }
  return props.options;
});

const virtualListHeight = computed(() => {
  if (!props.virtualScroll) return 0;
  return searchFilterList.value.length * props.itemHeight;
});

const visibleOptions = computed(() => {
  if (!props.virtualScroll) return [];
  const endIndex = Math.min(startIndex.value + visibleCount.value, searchFilterList.value.length);
  return searchFilterList.value.slice(startIndex.value, endIndex);
});

// watchers
watch(
  () => isOpen.value,
  newIsOpen => {
    nextTick(() => {
      if (props.virtualScroll) {
        updateVisibleCount();
      }
      scrollToSelectedItem();
      if (dropdown.value) {
        if (newIsOpen) {
          dropdown.value.addEventListener('scroll', handleScroll);
        } else {
          dropdown.value.removeEventListener('scroll', handleScroll);
        }
      }
    });
  }
);

// lifecycles
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  window.addEventListener('resize', handleResize);
  if (props.virtualScroll) updateVisibleCount();
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('resize', handleResize);
});

// methods
function selectOption(option: SelectOption) {
  if (option.disabled) return;

  const optionIndex = searchFilterList.value.findIndex(opt => opt.value === option[props.useValue]);

  if (props.isMultiple) {
    const values = modelMultiple.value;
    const index = values.indexOf(option[props.useValue]);
    if (index === -1) {
      modelMultiple.value = [...values, option[props.useValue]];
      focusedIndex.value = optionIndex;
    } else {
      modelMultiple.value = values.filter(val => val !== option[props.useValue]);
      focusedIndex.value = optionIndex;
    }
  } else {
    model.value = option[props.useValue];
    focusedIndex.value = optionIndex;
    isOpen.value = false;
  }
  emit('select', option);
}

function isSelected(value: string) {
  return props.isMultiple ? modelMultiple.value.includes(value) : model.value === value;
}

function updateDropdownPosition() {
  nextTick(() => {
    if (!selectContainer.value || !selectTrigger.value || !dropdown.value || !isOpen.value) return;

    dropdownPosition.value = calculateElementPosition(selectContainer.value, selectTrigger.value, dropdown.value, {
      preferredPosition: props.optionsPosition,
      offset: props.optionsOffset,
    });
  });
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
      selectTrigger.value?.focus();
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
  nextTick(() => {
    if (!dropdown.value) return;

    const selectedIndex = props.isMultiple
      ? searchFilterList.value.findIndex(opt => modelMultiple.value.includes(opt[props.useValue]))
      : searchFilterList.value.findIndex(opt => opt.value === model.value);

    if (selectedIndex !== -1) {
      if (props.virtualScroll) {
        const visibleItems = Math.floor(dropdown.value.clientHeight / props.itemHeight);
        startIndex.value = Math.max(0, selectedIndex - Math.floor(visibleItems / 2));
        const scrollPosition = selectedIndex * props.itemHeight;
        dropdown.value.scrollTop = scrollPosition - (visibleItems / 2) * props.itemHeight;
        focusedIndex.value = selectedIndex;
      } else {
        const items = dropdown.value.querySelectorAll('.select-dropdown-item');
        if (items.length > 0 && selectedIndex >= 0 && selectedIndex < items.length) {
          const selectedElement = items[selectedIndex];
          if (selectedElement && typeof selectedElement.scrollIntoView === 'function') {
            selectedElement.scrollIntoView({
              block: 'nearest',
            });
            focusedIndex.value = selectedIndex;
          }
        }
      }
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
  if (props.disabled) return;

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
        selectTrigger.value?.focus();
      }
      break;
  }
}

function handleSearchKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

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

function getItemClasses(option: SelectOption, index: number): Record<string, boolean> {
  return {
    'select-dropdown-item-selected': isSelected(option[props.useValue]),
    'select-dropdown-item-disabled': !!option.disabled,
    'select-dropdown-item-focused': focusedIndex.value === index && !option.disabled,
  };
}

function handleMouseover(index: number) {
  focusedIndex.value = index;
}

function updateVisibleCount() {
  if (!props.virtualScroll || !dropdown.value) return;
  const containerHeight = dropdown.value.clientHeight;
  visibleCount.value = Math.ceil(containerHeight / props.itemHeight) + props.virtualScrollBuffer * 2;
}

function handleScroll(event: Event) {
  if (!props.virtualScroll) return;
  const target = event.target as HTMLElement;
  const scrollTop = target.scrollTop;
  const newStartIndex = Math.floor(scrollTop / props.itemHeight);
  startIndex.value = Math.max(0, newStartIndex - props.virtualScrollBuffer);
  updateVisibleCount();
}

function getItemStyle(index: number) {
  if (!props.virtualScroll) return {};
  const absoluteIndex = startIndex.value + index;
  return {
    position: 'absolute',
    top: `${absoluteIndex * props.itemHeight}px`,
    left: '0',
    right: '0',
    height: `${props.itemHeight}px`,
  } as CSSProperties;
}
</script>

<style lang="scss" scoped src="./Select.style.scss"></style>
