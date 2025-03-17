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
        <div
          v-if="isOpen"
          :id="`${selectId}-dropdown`"
          ref="dropdown"
          class="select-dropdown"
          :style="dropdownPosition"
          @click="handleDropdownClick"
        >
          <template v-if="isSearch && options.length > 0">
            <input
              v-model="searchModel"
              placeholder="Search..."
              class="select-dropdown-search"
              @keydown="handleSearchKeydown"
            />
          </template>
          <template v-if="!searchFilterList.length">
            <li class="select-dropdown-no-content">
              <p>No options available</p>
            </li>
          </template>
          <template v-if="props.virtualScroll && searchFilterList.length">
            <ul
              class="virtual-list"
              role="listbox"
              tabindex="-1"
              :style="{ height: `${virtualListHeight}px` }"
            >
              <li
                v-for="(option, index) in visibleOptions"
                :key="option.value"
                class="select-dropdown-item"
                :style="getItemStyle(index)"
                :class="getItemClasses(option, index + startIndex)"
                role="option"
                :aria-selected="isSelected(option.value)"
                :aria-disabled="option.disabled"
                @click="selectOption(option)"
                @mouseover="handleMouseover(index + startIndex)"
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
            </ul>
          </template>
          <template v-else-if="searchFilterList.length">
            <ul
              class="select-list"
              role="listbox"
              tabindex="-1"
            >
              <li
                v-for="(option, index) in searchFilterList"
                :key="option.value"
                class="select-dropdown-item"
                :class="getItemClasses(option, index)"
                role="option"
                :aria-selected="isSelected(option.value)"
                :aria-disabled="option.disabled"
                @click="selectOption(option)"
                @mouseover="handleMouseover(index)"
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
            </ul>
          </template>
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
import Svg from 'library/Svg';
import { computed, type CSSProperties, nextTick, onBeforeUnmount, onMounted, ref, useId, useTemplateRef, watch } from 'vue';
import { arrowDownIcon, checkIcon } from '@/assets/icons';
import type { SelectOption, SelectProps } from 'library/Select';
import { calculateElementPosition, type PositionStyle } from '@/utils/calculatePosition';

const props = withDefaults(defineProps<SelectProps>(), {
  isMultiple: false,
  optionsPosition: 'bottom',
  optionsOffset: 4,
  isSearch: false,
  itemHeight: 40,
  virtualScroll: false,
  virtualScrollBuffer: 3,
});

const selectId = useId();

const model = defineModel<string | null>();
const modelMultiple = defineModel<string[]>('multiple', { default: () => [] });
const searchModel = defineModel<string>('search', { default: '' });
const selectContainer = useTemplateRef('selectContainer');
const selectTrigger = useTemplateRef('selectTrigger');
const dropdown = useTemplateRef('dropdown');
const isOpen = ref<boolean>(false);
const dropdownPosition = ref<PositionStyle>({
  top: '0px',
  left: '0px',
  width: '0px',
});
const focusedIndex = ref<number>(-1);
const startIndex = ref(0);
const visibleCount = ref(0);

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

const virtualListHeight = computed(() => {
  return props.virtualScroll ? searchFilterList.value.length * props.itemHeight : 0;
});

const visibleOptions = computed(() => {
  if (!props.virtualScroll) return [];
  const endIndex = Math.min(startIndex.value + visibleCount.value, searchFilterList.value.length);
  return searchFilterList.value.slice(startIndex.value, endIndex);
});

watch(
  () => isOpen.value,
  newIsOpen => {
    nextTick(() => {
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

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  window.addEventListener('resize', handleResize);
  if (props.virtualScroll) updateVisibleCount();
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

function updateDropdownPosition() {
  nextTick(() => {
    if (!selectContainer.value || !selectTrigger.value || !dropdown.value || !isOpen.value) return;

    dropdownPosition.value = calculateElementPosition(selectContainer.value, selectTrigger.value, dropdown.value, {
      preferredPosition: props.optionsPosition,
      offset: props.optionsOffset,
    });

    if (props.virtualScroll) {
      updateVisibleCount();
    }

    scrollToSelectedItem();
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

    const selectedIndex = props.isMultiple ? searchFilterList.value.findIndex(opt => modelMultiple.value.includes(opt.value)) : searchFilterList.value.findIndex(opt => opt.value === model.value);

    if (selectedIndex !== -1) {
      if (props.virtualScroll) {
        const visibleItems = Math.floor(dropdown.value.clientHeight / props.itemHeight);
        startIndex.value = Math.max(0, selectedIndex - Math.floor(visibleItems / 2));
        const scrollPosition = selectedIndex * props.itemHeight;
        dropdown.value.scrollTop = scrollPosition - (visibleItems / 2) * props.itemHeight;
        focusedIndex.value = selectedIndex;
      } else {
        const selectedElement = dropdown.value.querySelectorAll('.select-dropdown-item')[selectedIndex];
        if (selectedElement) {
          selectedElement.scrollIntoView({
            block: 'nearest',
          });
          focusedIndex.value = selectedIndex;
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
        selectTrigger.value?.focus();
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
    'select-dropdown-item-selected': isSelected(option.value),
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
  const scrollTop = (event.target as HTMLElement).scrollTop;
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
    left: '0px',
    height: `${props.itemHeight}px`,
  } as CSSProperties;
}
</script>

<style lang="scss" scoped src="./Select.style.scss"></style>
