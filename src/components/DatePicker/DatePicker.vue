<template>
  <div class="calendar">
    <div class="calendar-content">
      <div class="calendar-header">
        <button @click="previousMonth">Pre</button>
        <span>{{ activeDate.monthText }} - {{ activeDate.year }}</span>
        <button @click="nextMonth">Next</button>
      </div>
      <div class="calendar-table">
        <div class="week-days">
          <span
            v-for="(day, index) in weekDays"
            :key="index"
            class="calendar-cell"
          >
            {{ day }}
          </span>
        </div>
        <div class="month-days">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar-cell day"
            :class="[
              {
                today: day.isToday,
                selected: day.isSelected,
                disabled: day.isDisabled,
                passive: day.isPassive,
                'first-day-of-week': day.isFirstDayOfWeek,
                'last-day-of-week': day.isLastDayOfWeek,
              },
            ]"
          >
            <span class="day-content">
              {{ day.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// imports

// interfaces & types
interface CalendarProps {
  firstDayOfWeek?: 'monday' | 'sunday';
}
interface DayItem {
  date: Date;
  text: string;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isPassive: boolean;
  isFirstDayOfWeek?: boolean;
  isLastDayOfWeek?: boolean;
}
// constants
const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

// composable

// props
const props = withDefaults(defineProps<CalendarProps>(), {
  firstDayOfWeek: 'sunday',
});
// defineEmits

// states (refs and reactives)
const currentDate = ref(new Date('04.01.2025'));
// computed
const weekDays = computed(() => {
  const weekDays = [];
  const firstDayOfWeek = props.firstDayOfWeek === 'monday' ? 0 : 6;
  for (let i = 0; i < 7; i++) {
    const dayIndex = (firstDayOfWeek + i) % 7;
    weekDays.push(days[dayIndex]);
  }
  return weekDays;
});
const activeDate = computed(() => {
  return {
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth(),
    day: currentDate.value.getDate(),
    dayText: new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(currentDate.value),
    monthText: new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(currentDate.value),
  };
});
const calendarDays = computed(() => {
  const days: DayItem[] = [];
  const today = new Date();
  const activeYear = activeDate.value.year;
  const activeMonth = activeDate.value.month;
  const isMondayStart = props.firstDayOfWeek === 'monday';

  const firstDayOfMonth = new Date(activeYear, activeMonth, 1);
  let firstWeekDay = firstDayOfMonth.getDay();
  if (isMondayStart) firstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

  const lastDateOfMonth = new Date(activeYear, activeMonth + 1, 0);
  const lastDayOfMonth = lastDateOfMonth.getDate();

  for (let i = firstWeekDay; i > 0; i--) {
    const date = new Date(activeYear, activeMonth, -i + 1);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: date.getDate().toString(),
      isToday: date.toDateString() === today.toDateString(),
      isSelected: false,
      isDisabled: false,
      isPassive: true,
      isFirstDayOfWeek: weekDay === 0,
      isLastDayOfWeek: weekDay === 6,
    });
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const date = new Date(activeYear, activeMonth, i);
    let weekDay = date.getDay();
    if (isMondayStart) weekDay = weekDay === 0 ? 6 : weekDay - 1;
    days.push({
      date,
      text: i.toString(),
      isToday: date.toDateString() === today.toDateString(),
      isSelected: false,
      isDisabled: false,
      isPassive: false,
      isFirstDayOfWeek: weekDay === 0,
      isLastDayOfWeek: weekDay === 6,
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
      isToday: date.toDateString() === today.toDateString(),
      isSelected: false,
      isDisabled: false,
      isPassive: true,
      isFirstDayOfWeek: weekDay === 0,
      isLastDayOfWeek: weekDay === 6,
    });
  }

  return days;
});

// watchers

// lifecycles

// methods
function previousMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(currentDate.value.getMonth() - 1);
  currentDate.value = newDate;
}
function nextMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(currentDate.value.getMonth() + 1);
  currentDate.value = newDate;
}
</script>

<style lang="scss" scoped src="./DatePicker.style.scss"></style>
