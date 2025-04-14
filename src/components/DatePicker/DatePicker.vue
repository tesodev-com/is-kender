<template>
  <div class="datepicker-wrapper">
    <Input
      v-if="!inline"
      ref="datepickerInputRef"
      v-model="inputModelValue"
      readOnly
      fluid
      @click="onToggle"
    />
    <transition name="fade">
      <div
        v-if="isShowDatePicker || inline"
        ref="datepickerRef"
        class="datepicker-container"
      >
        <div
          v-if="selectionItems.length"
          class="datepicker-sidebar"
        >
          <QuickSelection
            ref="quickSelectionRef"
            :selectionItems="selectionItems"
            @on-select="onQuickSelect"
          />
        </div>
        <div class="datepicker-content">
          <div class="datepicker-body">
            <Calendar
              v-for="calendar in calendarList"
              :key="calendar.id"
              v-model="modelValue"
              v-bind="calendar"
              v-on="calendar.events"
            />
          </div>
          <div
            v-if="actionBar"
            class="datepicker-footer"
          >
            <div
              v-if="actionBar"
              class="datepicker-actions"
              :class="{ 'fluid-actions': !multipleMonth }"
            >
              <Button
                color="secondary"
                variant="outline"
                :fluid="!multipleMonth"
                @click="onClear"
              >
                Temizle
              </Button>
              <Button
                color="primary"
                variant="solid"
                :fluid="!multipleMonth"
                @click="onApply"
              >
                Uygula
              </Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// imports
import Button from 'library-components/Button';
import Input from 'library-components/Input';
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import { Calendar, QuickSelection, type CalendarProps, type DateModel } from './SubComponents';
import type { DatePickerEmits, DatePickerProps } from './types';
import Utils from './utils';
// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<DatePickerProps>(), {
  selectionItems: () => [],
  selectionMode: 'single',
});
const modelValue = defineModel<DateModel>();
// defineEmits
const emit = defineEmits<DatePickerEmits>();
// states (refs and reactives)
const isShowDatePicker = ref(false);
const visibleDate = ref<Date>(new Date());
const datepickerInputRef = useTemplateRef('datepickerInputRef');
const datepickerRef = useTemplateRef('datepickerRef');
const quickSelectionRef = useTemplateRef('quickSelectionRef');
// computed
const calendarVisibleDates = computed(() => {
  return {
    start: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth()),
    end: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth() + 1),
  };
});
const inputModelValue = computed({
  get: () => {
    if (!modelValue.value) return '';
    if (Array.isArray(modelValue.value)) {
      return modelValue.value
        .filter(date => Boolean(date))
        .map(date => Utils.formatDate(date as string))
        .join(props.selectionMode === 'range' ? ' - ' : ', ');
    } else if (modelValue.value instanceof Date) {
      return Utils.formatDate(modelValue.value);
    } else {
      return Utils.formatDate(modelValue.value);
    }
  },
  set: value => {
    modelValue.value = value;
  },
});
const calendarList = computed(() => {
  const commonProps = {
    selectionMode: props.selectionMode,
    min: props.min,
    max: props.max,
    disabledDates: props.disabledDates,
    events: {
      onPrev,
      onNext,
      onRenderDate,
    },
  };
  const calendars = [
    {
      id: 'start',
      showPrevIcon: true,
      showNextIcon: !props.multipleMonth,
      calendarDate: calendarVisibleDates.value.start,
      ...commonProps,
    },
    {
      id: 'end',
      showPrevIcon: !props.multipleMonth,
      showNextIcon: true,
      calendarDate: calendarVisibleDates.value.end,
      ...commonProps,
    },
  ];
  if (!props.multipleMonth) calendars.pop();
  return calendars as CalendarProps[];
});
// watchers

// lifecycles
onMounted(() => {
  document.addEventListener('click', onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
// methods
function onPrev() {
  visibleDate.value = Utils.addMonths(visibleDate.value, -1);
}
function onNext() {
  visibleDate.value = Utils.addMonths(visibleDate.value, 1);
}
function onRenderDate(id: CalendarProps['id'], date: Date) {
  if (id === 'start') {
    visibleDate.value = date;
  } else {
    visibleDate.value = Utils.addMonths(date, -1);
  }
}
function onClear() {
  modelValue.value = null;
  if (quickSelectionRef.value) quickSelectionRef.value.onClear();
}
function onQuickSelect(dates: Array<Date | string> | Date | string) {
  modelValue.value = dates;
}
function onToggle() {
  isShowDatePicker.value = !isShowDatePicker.value;
}
function onApply() {
  emit('onApply', modelValue.value);
  onToggle();
}
function onClickOutside(event: MouseEvent) {
  if (props.inline) return;
  const target = event.target as HTMLElement;
  const isDatePicker = datepickerRef.value?.contains(target);
  const isInput = (datepickerInputRef.value?.$el as HTMLDivElement).contains(target);
  if (!isDatePicker && !isInput) {
    isShowDatePicker.value = false;
  }
}
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
