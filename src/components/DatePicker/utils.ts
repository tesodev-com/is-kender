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
  isSameDay(date1: Date, date2: Date) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  },
  isBefore(date1: Date, date2: Date) {
    return date1.getTime() < date2.getTime();
  },
  isAfter(date1: Date, date2: Date) {
    return date1.getTime() > date2.getTime();
  },
  isBetween(date: Date, startDate: Date, endDate: Date) {
    return date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime();
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
