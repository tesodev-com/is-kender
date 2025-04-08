export default {
  previousMonth(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
  },
  nextMonth(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
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
