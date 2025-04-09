export default {
  addYears(date: Date, year: number) {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + year);
    return newDate;
  },
  addMonths(date: Date, month: number) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + month);
    return newDate;
  },
  addHours(date: Date, hour: number) {
    const newDate = new Date(date);
    newDate.setHours(date.getHours() + hour);
    return newDate;
  },
  addMinutes(date: Date, minute: number) {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + minute);
    return newDate;
  },
  setTimeZero(date: Date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },
  isSameDay(date1: Date | string, date2: Date | string) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  },
  isBefore(date1: Date | string, date2: Date | string) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getTime() < d2.getTime();
  },
  isAfter(date1: Date | string, date2: Date | string) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getTime() > d2.getTime();
  },
  isBetween(date: Date | string, startDate: Date | string, endDate: Date | string) {
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return d.getTime() > start.getTime() && d.getTime() < end.getTime();
  },
  getString(date: Date | string) {
    const d = new Date(date);
    return d.toString();
  },
  getDateDiff(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
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
  formatDate(date: Date) {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
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
