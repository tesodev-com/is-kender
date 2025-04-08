export interface CalendarProps {
  firstDayOfWeek?: 'monday' | 'sunday';
  selectMode?: 'single' | 'range';
  bottonBar?: {
    clear?: boolean;
    apply?: (value: Date | { startDate: Date | null | undefined; endDate: Date | null | undefined } | null) => void;
  };
}
export interface CalendarEmits {
  (event: 'update:modelValue', value: Date | { startDate: Date | null; endDate: Date | null } | null): void;
}
export interface DayItem {
  date: Date;
  text: string;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isPassive: boolean;
  isFirstDayOfWeek?: boolean;
  isLastDayOfWeek?: boolean;
  isRangeStart?: boolean;
  isInRange?: boolean;
  isRangeEnd?: boolean;
}
