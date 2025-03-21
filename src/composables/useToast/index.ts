import { EventBus } from '@/utils';
import type { ToastMessageProps } from 'library-components/Toast';

export function useToast() {
  return {
    add(message: ToastMessageProps) {
      EventBus.emit('toast:add', message);
    },
  };
}
