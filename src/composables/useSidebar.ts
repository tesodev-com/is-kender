import { EventBus } from '@/utils';

export function useSidebar() {
  return {
    open(cb?: () => void) {
      EventBus.emit('sidebar:open', cb);
    },
    close() {
      EventBus.emit('sidebar:close');
    },
  };
}
