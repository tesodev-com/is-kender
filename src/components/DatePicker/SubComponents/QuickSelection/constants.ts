import type { QuickSelectionItem } from './types';

export const QUICK_SELECTION_ITEM: Array<QuickSelectionItem> = [
  {
    key: 'today',
    label: 'Bugün',
    func: () => {
      const today = new Date();
      return [today, today];
    },
  },
  {
    key: 'yesterday',
    label: 'Dün',
    func: () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return [yesterday, yesterday];
    },
  },
  {
    key: 'thisWeek',
    label: 'Bu hafta',
    func: () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return [startOfWeek, endOfWeek];
    },
  },
  {
    key: 'lastWeek',
    label: 'Geçen hafta',
    func: () => {
      const today = new Date();
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
    key: 'thisMonth',
    label: 'Bu ay',
    func: () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return [startOfMonth, endOfMonth];
    },
  },
  {
    key: 'lastMonth',
    label: 'Geçen ay',
    func: () => {
      const today = new Date();
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return [startOfLastMonth, endOfLastMonth];
    },
  },
  {
    key: 'thisYear',
    label: 'Bu yıl',
    func: () => {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear() + 1, 0, 0);
      return [startOfYear, endOfYear];
    },
  },
  {
    key: 'lastYear',
    label: 'Geçen yıl',
    func: () => {
      const today = new Date();
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear(), 0, 0);
      return [startOfLastYear, endOfLastYear];
    },
  },
] as const;
