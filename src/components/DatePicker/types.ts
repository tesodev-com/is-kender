import type Consts from './constants';

export interface DatePickerProps {
  firstDayOfWeek?: 'monday' | 'sunday';
  selectMode?: 'single' | 'range';
}
export interface DatePickerEmits {
  (event: 'update:modelValue', value: Date | Array<Date | null> | null | undefined): void;
  (event: 'onPrev', value: Date): void;
  (event: 'onNext', value: Date): void;
}
export interface FastAction {
  type: (typeof Consts.ACTIONS)[number]['type'];
  label: (typeof Consts.ACTIONS)[number]['label'];
  fnc: (date: Date) => Date[];
}
export interface DayItem {
  date: Date;
  text: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  isToday?: boolean;
  isFirstDayOfWeek?: boolean;
  isLastDayOfWeek?: boolean;
  outOfMonth?: boolean;
}
