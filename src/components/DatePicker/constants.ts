import Utils from './utils';

function getTimeZeroToday() {
  return Utils.setTimeZero(new Date());
}

export default {
  DAYS: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
  ACTIONS: [
    {
      type: 'today',
      label: 'Bugün',
      fnc: () => {
        const today = getTimeZeroToday();
        return [today, today];
      },
    },
    {
      type: 'yesterday',
      label: 'Dün',
      fnc: () => {
        const today = getTimeZeroToday();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return [yesterday, yesterday];
      },
    },
    {
      type: 'thisWeek',
      label: 'Bu hafta',
      fnc: () => {
        const today = getTimeZeroToday();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return [startOfWeek, endOfWeek];
      },
    },
    {
      type: 'lastWeek',
      label: 'Son hafta',
      fnc: () => {
        const today = getTimeZeroToday();
        const dayOfWeek = today.getDay();
        const startOfThisWeek = new Date(today);
        startOfThisWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        const startOfLastWeek = new Date(startOfThisWeek);
        startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
        const endOfLastWeek = new Date(startOfLastWeek);
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
        return [startOfLastWeek, endOfLastWeek];
      },
    },
    {
      type: 'thisMonth',
      label: 'Bu ay',
      fnc: () => {
        const today = getTimeZeroToday();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return [startOfMonth, endOfMonth];
      },
    },
    {
      type: 'lastMonth',
      label: 'Son ay',
      fnc: () => {
        const today = getTimeZeroToday();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        return [startOfMonth, endOfMonth];
      },
    },
    {
      type: 'thisYear',
      label: 'Bu yıl',
      fnc: () => {
        const today = getTimeZeroToday();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        return [startOfYear, endOfYear];
      },
    },
    {
      type: 'lastYear',
      label: 'Son yıl',
      fnc: () => {
        const today = getTimeZeroToday();
        const startOfYear = new Date(today.getFullYear() - 1, 0, 1);
        const endOfYear = new Date(today.getFullYear() - 1, 11, 31);
        return [startOfYear, endOfYear];
      },
    },
  ] as const,
};
