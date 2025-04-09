import type { DateModel } from './Calendar';
import type Consts from './constants';

export interface DatePickerProps {
  firstDayOfWeek?: 'monday' | 'sunday';
  selectionMode?: 'single' | 'range';
  fastActions?: Array<FastAction['type']>;
  multipleMonths?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showActionBar?: boolean;
  showTime?: boolean;
}
export interface DatePickerEmits {
  (event: 'update:modelValue', value: DateModel | undefined): void;
  (event: 'onPrev', value: Date): void;
  (event: 'onNext', value: Date): void;
}
export interface FastAction {
  type: (typeof Consts.ACTIONS)[number]['type'];
  label: (typeof Consts.ACTIONS)[number]['label'];
  fnc: (date: Date) => Date[];
  isActive?: boolean;
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
