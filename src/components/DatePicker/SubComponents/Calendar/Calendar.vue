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
import type { CalendarEmits, CalendarProps, Day } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<CalendarProps>(), {
  calendarDate: () => new Date(),
  firstDayOfWeek: 'monday',
});
// defineEmits
const emit = defineEmits<CalendarEmits>();
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
    });
  }

  return days;
});
const monthText = computed(() => new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(props.calendarDate));
// watchers

// lifecycles

// methods
function onPrev() {
  emit('onPrev', Utils.addMonths(props.calendarDate, -1));
}
function onNext() {
  emit('onNext', Utils.addMonths(props.calendarDate, 1));
}
function getDayCellClass(day: Day) {
  const classes = {
    today: day.isToday,
    active: day.isActive,
    'begin-of-week': day.beginOfWeek,
    'end-of-week': day.endOfWeek,
    'out-of-month': day.outOfMonth,
  };

  return classes;
}
</script>

<style lang="scss" scoped src="./Calendar.style.scss"></style>
