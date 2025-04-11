export default {
  addYears(date: Date | string, year: number) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + year);
    return newDate;
  },
  addMonths(date: Date | string, month: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + month);
    return newDate;
  },
  addHours(date: Date | string, hour: number) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hour);
    return newDate;
  },
  addMinutes(date: Date | string, minute: number) {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minute);
    return newDate;
  },
  setTimeZero(date: Date | string) {
    const newDate = this.createDateInstance(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },
  isSameDay(date1: Date | string, date2: Date | string) {
    const d1 = this.createDateInstance(date1);
    const d2 = this.createDateInstance(date2);
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  },
  isBefore(date1: Date | string, date2: Date | string) {
    const d1 = this.createDateInstance(date1);
    const d2 = this.createDateInstance(date2);
    return d1.getTime() < d2.getTime();
  },
  isAfter(date1: Date | string, date2: Date | string) {
    const d1 = this.createDateInstance(date1);
    const d2 = this.createDateInstance(date2);
    return d1.getTime() > d2.getTime();
  },
  isBetween(date: Date | string, startDate: Date | string, endDate: Date | string) {
    const d = this.createDateInstance(date);
    const start = this.createDateInstance(startDate);
    const end = this.createDateInstance(endDate);
    return d.getTime() > start.getTime() && d.getTime() < end.getTime();
  },
  getString(date: Date | string) {
    const d = this.createDateInstance(date);
    return d.toString();
  },
  getDateDiff(startDate: Date, endDate: Date) {
    const start = this.createDateInstance(startDate);
    const end = this.createDateInstance(endDate);
    const diff = end.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return {
      days,
      months,
      years,
      total: diff,
    };
  },
  createDateInstance(date: Date | string) {
    return date instanceof Date ? date : new Date(date);
  },
  formatDate(date: Date | string, format: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }) {
    return new Intl.DateTimeFormat('tr-TR', format).format(this.createDateInstance(date));
  },
  normalizeModelValue(value: any) {
    if (value === null || value === undefined) {
      return [null, null];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value, null];
  },
};
