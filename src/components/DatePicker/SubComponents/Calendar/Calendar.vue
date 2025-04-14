<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <Svg
        v-if="showPrevIcon"
        size="1.5rem"
        class="calendar-navigation-icon"
        :src="chevronLeftIcon"
        @click="onPrev"
      ></Svg>
      <span class="calendar-navigation-text">
        <Button
          v-if="renderCalendarType === 'date'"
          color="secondary"
          variant="ghost"
          size="sm"
          @click="renderCalendarType = 'month'"
        >
          {{ visibleDateText.monthText }}
        </Button>
        <Button
          color="secondary"
          variant="ghost"
          size="sm"
          @click="renderCalendarType = 'year'"
        >
          {{ visibleDateText.yearText }}
        </Button>
      </span>
      <Svg
        v-if="showNextIcon || ['month', 'year'].includes(renderCalendarType)"
        size="1.5rem"
        class="calendar-navigation-icon"
        :src="chevronRightIcon"
        @click="onNext"
      ></Svg>
    </div>
    <template v-if="renderCalendarType === 'date'">
      <div class="calendar-week-days">
        <span
          v-for="(day, index) in weekDays"
          :key="index"
          class="calendar-cell"
        >
          {{ day }}
        </span>
      </div>
      <div class="calendar-month-days">
        <div
          v-for="(day, index) in monthDays"
          :key="index"
          class="calendar-cell"
          :class="getDayCellClass(day)"
          @click="onClick(day)"
        >
          <span class="calendar-cell-text">{{ day.text }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="renderCalendarType === 'month'">
      <div class="calendar-months">
        <div
          v-for="(month, index) in visibleMonths"
          :key="index"
        >
          <Button
            color="secondary"
            variant="ghost"
            fluid
            @click="onRenderDate('month', month.date)"
          >
            {{ month.text }}
          </Button>
        </div>
      </div>
    </template>
    <template v-else-if="renderCalendarType === 'year'">
      <div class="calendar-years">
        <div
          v-for="(year, index) in visibleYears"
          :key="index"
        >
          <Button
            color="secondary"
            variant="ghost"
            fluid
            @click="onRenderDate('year', year.date)"
          >
            {{ year.text }}
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// imports
import { chevronLeftIcon, chevronRightIcon } from '@/assets/icons';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import { computed, ref, watch } from 'vue';
import Utils from '../../utils';
import { DAYS, MONTHS } from './constants';
import type { CalendarProps, DateModel, Day } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<CalendarProps>(), {
  calendarDate: () => new Date(),
  firstDayOfWeek: 'monday',
});
const modelValue = defineModel<DateModel>();
// defineEmits

// states (refs and reactives)
const visibleDate = ref<Date>(new Date());
const renderCalendarType = ref<'date' | 'month' | 'year'>('date');
// computed
const weekDays = computed(() => DAYS);
const monthDays = computed(() => {
  const days: Day[] = [];
  const activeMonth = visibleDate.value.getMonth();
  const activeYear = visibleDate.value.getFullYear();
  const isMondayStart = props.firstDayOfWeek === 'monday';

  const firstDateOfMonth = new Date(activeYear, activeMonth, 1);
  let firstWeekDay = firstDateOfMonth.getDay();
  if (isMondayStart) firstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

  const lastDateOfMonth = new Date(activeYear, activeMonth + 1, 0);
  const lastDayOfMonth = lastDateOfMonth.getDate();

  // TODO: Eksik gün kadar çalışmalı. Revize edilecek
  for (let i = firstWeekDay; i > 0; i--) {
    const date = new Date(activeYear, activeMonth, -i + 1);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: date.getDate().toString(),
      beginOfWeek: weekDay === 0,
      endOfWeek: weekDay === 6,
      outOfMonth: true,
      isDisabled: checkIsDisabled(date),
    });
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const date = new Date(activeYear, activeMonth, i);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: i.toString(),
      isToday: Boolean(Utils.isSameDay(date, new Date())),
      beginOfWeek: weekDay === 0,
      endOfWeek: weekDay === 6,
      isDisabled: checkIsDisabled(date),
    });
  }

  let lastWeekDay = lastDateOfMonth.getDay();
  if (isMondayStart) lastWeekDay = lastWeekDay === 0 ? 6 : lastWeekDay - 1;
  const remainingDays = 6 - lastWeekDay;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(activeYear, activeMonth + 1, i);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: i.toString(),
      beginOfWeek: weekDay === 0,
      endOfWeek: weekDay === 6,
      outOfMonth: true,
      isDisabled: checkIsDisabled(date),
    });
  }

  return days;
});
const visibleMonths = computed(() => {
  const months: Day[] = [];
  const activeYear = visibleDate.value.getFullYear();
  for (let i = 0; i < MONTHS.length; i++) {
    const date = new Date(activeYear, i, 1);
    months.push({
      date,
      text: MONTHS[i],
      isDisabled: checkIsDisabled(date),
    });
  }
  return months;
});
const visibleYears = computed(() => {
  const years: Day[] = [];
  const activeYear = visibleDate.value.getFullYear();
  const startYear = Math.floor(activeYear / 10) * 10;
  for (let i = startYear; i < startYear + 10; i++) {
    const date = new Date(i, 0, 1);
    years.push({
      date,
      text: i.toString(),
      isDisabled: checkIsDisabled(date),
    });
  }
  return years;
});
const visibleDateText = computed(() => {
  const dateTexts = Utils.formatDate(visibleDate.value, { month: 'long', year: 'numeric' }).split(' ');
  const startYear = Math.floor(visibleDate.value.getFullYear() / 10) * 10;
  const endYear = startYear + 9;
  return {
    monthText: dateTexts[0],
    yearText: renderCalendarType.value === 'year' ? `${startYear} - ${endYear}` : dateTexts[1],
  };
});
// watchers
watch(
  () => props.calendarDate,
  newVal => {
    if (newVal) {
      visibleDate.value = new Date(newVal);
    }
  },
  { immediate: true }
);
// lifecycles

// methods
function onPrev() {
  if (renderCalendarType.value === 'month') {
    visibleDate.value = Utils.addYears(visibleDate.value, -1);
  } else if (renderCalendarType.value === 'year') {
    const [startYear] = visibleDateText.value.yearText.split(' - ').map(Number);
    const newStartYear = startYear - 10;
    visibleDate.value = new Date(newStartYear, 0, 1);
  } else {
    props.events.onPrev();
  }
}
function onNext() {
  if (renderCalendarType.value === 'month') {
    visibleDate.value = Utils.addYears(visibleDate.value, 1);
  } else if (renderCalendarType.value === 'year') {
    const [startYear] = visibleDateText.value.yearText.split(' - ').map(Number);
    const newStartYear = startYear + 10;
    visibleDate.value = new Date(newStartYear, 0, 1);
  } else {
    props.events.onNext();
  }
}
function onRenderDate(type: typeof renderCalendarType.value, value: Date) {
  if (type === 'month') {
    renderCalendarType.value = 'date';
    visibleDate.value = value;
  } else if (type === 'year') {
    renderCalendarType.value = 'month';
    visibleDate.value = value;
  } else {
    visibleDate.value = value;
  }
  props.events.onRenderDate(props.id, visibleDate.value);
}
function onClick(selectedDay: Day) {
  let newModelValue;
  if (selectedDay.isDisabled) return;
  if (props.selectionMode === 'single') {
    newModelValue = Utils.getString(selectedDay.date);
  } else if (props.selectionMode === 'range') {
    const [sDate, eDate] = Utils.normalizeModelValue(modelValue.value);
    if (!sDate || (sDate && eDate)) {
      newModelValue = [Utils.getString(selectedDay.date), null];
    } else {
      if (Utils.isSameDay(sDate, selectedDay.date)) {
        newModelValue = [null, null];
      } else if (Utils.isBefore(sDate, selectedDay.date)) {
        newModelValue = [Utils.getString(sDate), Utils.getString(selectedDay.date)];
      } else {
        newModelValue = [Utils.getString(selectedDay.date), Utils.getString(sDate)];
      }
    }
  } else if (props.selectionMode === 'multiple') {
    if (Array.isArray(modelValue.value)) {
      const index = modelValue.value.filter((date): date is string | Date => Boolean(date)).findIndex(date => Utils.isSameDay(date, selectedDay.date));
      if (index > -1) {
        newModelValue = modelValue.value.filter((_, i) => i !== index);
      } else {
        newModelValue = [...modelValue.value, Utils.getString(selectedDay.date)];
      }
    } else {
      newModelValue = [Utils.getString(selectedDay.date)];
    }
  } else {
    return;
  }
  modelValue.value = newModelValue;
}
function getDayCellClass(day: Day) {
  const classes = {
    today: day.isToday,
    active: checkIsActive(day),
    disabled: day.isDisabled,
    'begin-of-week': day.beginOfWeek,
    'end-of-week': day.endOfWeek,
    'out-of-month': day.outOfMonth,
  };

  if (props.selectionMode === 'range' && Array.isArray(modelValue.value) && modelValue.value.length === 2) {
    Object.assign(classes, {
      'range-start': Boolean(modelValue.value[0] && Utils.isSameDay(day.date, modelValue.value[0])),
      range: Boolean(modelValue.value[0] && modelValue.value[1] && Utils.isBetween(day.date, modelValue.value[0], modelValue.value[1])),
      'range-end': Boolean(modelValue.value[1] && Utils.isSameDay(day.date, modelValue.value[1])),
    });
  }

  return classes;
}
function checkIsActive(day: Day) {
  if (Array.isArray(modelValue.value)) {
    return modelValue.value.includes(Utils.getString(day.date));
  } else if (typeof modelValue.value === 'string' || modelValue.value instanceof Date) {
    return Utils.isSameDay(day.date, modelValue.value);
  }
}
function checkIsDisabled(date: Date) {
  const checkMin = props.min && Utils.isBefore(date, props.min);
  const checkMax = props.max && Utils.isAfter(date, props.max);
  const checkDisabled = props.disabledDates && props.disabledDates.some((disabledDate: Date | string) => Utils.isSameDay(date, disabledDate));
  return Boolean(checkMin || checkMax || checkDisabled);
}
</script>

<style lang="scss" scoped src="./Calendar.style.scss"></style>
