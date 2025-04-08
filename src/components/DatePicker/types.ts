export interface CalendarProps {
  firstDayOfWeek?: 'monday' | 'sunday';
  selectMode?: 'single' | 'range';
  header?: {
    title?: boolean;
    prev?: boolean;
    next?: boolean;
    view?: boolean;
    today?: boolean;
  };
  footer?: {
    clear?: boolean;
    apply?: (value: Date | { startDate: Date | null | undefined; endDate: Date | null | undefined } | null) => void;
  };
}
export type SingleDateModel = Date;
export type RangeDateModel = Array<Date | null>;
export type DateModel = SingleDateModel | RangeDateModel | null;
export interface CalendarEmits {
  (event: 'update:modelValue', value: Date | Array<Date | null> | null | undefined): void;
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
