import { EventBus } from '@/utils';
import type { MessageProps } from './Toast.vue';

export enum ToastEvents {
  ADD = 'toast:add',
  REMOVE = 'toast:remove',
  REMOVE_ALL = 'toast:removeAll'
};

export default {
  add(message: MessageProps) {
    EventBus.emit(ToastEvents.ADD, message);
  },
  removeAll() {
    EventBus.emit(ToastEvents.REMOVE_ALL);
  }
};