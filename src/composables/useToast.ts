import type { MessageProps } from '@/components';
import { EventBus } from '@/utils';

export function useToast() {
  return {
    add(message: MessageProps) {
      EventBus.emit('toast:add', message);
    },
  };
}
