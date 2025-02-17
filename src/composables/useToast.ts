import type { MessageProps } from '@/components';
import { EventBus } from '@/utils';

export function useToast() {
  const toastServices = {
    add(message: MessageProps) {
      EventBus.emit('toast:add', message);
    },
  };

  return toastServices;
}