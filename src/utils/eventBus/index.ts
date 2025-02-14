import { reactive } from 'vue';

interface IListener<T = any> {
   (payload: T): void;
}

interface IEventBus {
   on<T>(event: string, callback: IListener<T>): void;
   off<T>(event: string, callback: IListener<T>): void;
   emit<T>(event: string, payload?: T): void;
  clearEvent(event: string): void;
   clear(): void
}
const listeners: Record<string, IListener[]> = reactive({});

export const eventBus: IEventBus = {
  on<T>(event: string, callback: IListener<T>) {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  },

  off<T>(event: string, callback: IListener<T>) {
    if (listeners[event]) {
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    }
  },

  emit<T>(event: string, payload?: T) {
    if (listeners[event]) {
      listeners[event].forEach(callback => callback(payload));
    }
  },

  clearEvent(event: string) {
    if (listeners[event]) {
      delete listeners[event];
    }
  },

  clear() {
    for (const event in listeners) {
      delete listeners[event];
    }
  },
};