import Utils from '../../utils';
import type { QuickSelectionItem } from './types';

function getTimeZeroToday() {
  const today = new Date();
  return Utils.setTimeZero(today);
}

export const QUICK_SELECTION_ITEM: Array<QuickSelectionItem> = [
  {
    key: 'today',
    label: 'Bugün',
    func: () => {
      const today = getTimeZeroToday();
      return Utils.getString(today);
    },
  },
  {
    key: 'yesterday',
    label: 'Dün',
    func: () => {
      const today = getTimeZeroToday();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return Utils.getString(yesterday);
    },
  },
  {
    key: 'thisWeek',
    label: 'Bu hafta',
    func: () => {
      const today = getTimeZeroToday();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return [Utils.getString(startOfWeek), Utils.getString(endOfWeek)];
    },
  },
  {
    key: 'lastWeek',
    label: 'Geçen hafta',
    func: () => {
      const today = getTimeZeroToday();
      const dayOfWeek = today.getDay();
      const startOfThisWeek = new Date(today);
      startOfThisWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      const startOfLastWeek = new Date(startOfThisWeek);
      startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
      const endOfLastWeek = new Date(startOfLastWeek);
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
      return [Utils.getString(startOfLastWeek), Utils.getString(endOfLastWeek)];
    },
  },
  {
    key: 'thisMonth',
    label: 'Bu ay',
    func: () => {
      const today = getTimeZeroToday();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return [Utils.getString(startOfMonth), Utils.getString(endOfMonth)];
    },
  },
  {
    key: 'lastMonth',
    label: 'Geçen ay',
    func: () => {
      const today = getTimeZeroToday();
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return [Utils.getString(startOfLastMonth), Utils.getString(endOfLastMonth)];
    },
  },
  {
    key: 'thisYear',
    label: 'Bu yıl',
    func: () => {
      const today = getTimeZeroToday();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear() + 1, 0, 0);
      return [Utils.getString(startOfYear), Utils.getString(endOfYear)];
    },
  },
  {
    key: 'lastYear',
    label: 'Geçen yıl',
    func: () => {
      const today = getTimeZeroToday();
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear(), 0, 0);
      return [Utils.getString(startOfLastYear), Utils.getString(endOfLastYear)];
    },
  },
] as const;
