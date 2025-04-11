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
      <span class="calendar-navigation-text">{{ monthText }} 2025</span>
      <Svg
        v-if="showNextIcon"
        size="1.5rem"
        class="calendar-navigation-icon"
        :src="chevronRightIcon"
        @click="onNext"
      ></Svg>
    </div>
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
  </div>
</template>

<script setup lang="ts">
// imports
import { chevronLeftIcon, chevronRightIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { computed } from 'vue';
import Utils from '../../utils';
import { DAYS } from './constants';
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

// computed
const weekDays = computed(() => DAYS);
const monthDays = computed(() => {
  const days: Day[] = [];
  const activeMonth = props.calendarDate.getMonth();
  const activeYear = props.calendarDate.getFullYear();
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
const monthText = computed(() => new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(props.calendarDate));
// watchers

// lifecycles

// methods
function onPrev() {
  props.events.onPrev();
}
function onNext() {
  props.events.onNext();
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
