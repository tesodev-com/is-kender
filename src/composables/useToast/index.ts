import { EventBus } from '@/utils';
import type { ToastMessageProps } from 'library/Toast';

export function useToast() {
  return {
    add(message: ToastMessageProps) {
      EventBus.emit('toast:add', message);
    },
  };
}
