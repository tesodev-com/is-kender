import { describe, it, expect, vi } from 'vitest';
import { useEventBus } from '.';
import eventBus from '@/utils/eventBus';

describe('useEventBus composable', () => {
  it('should return the same eventBus instance', () => {
    const bus = useEventBus();
    expect(bus).toBe(eventBus);
  });

  it('should register an event listener', () => {
    const mockCallback = vi.fn();
    const bus = useEventBus();

    bus.on('test-event', mockCallback);
    bus.emit('test-event', 'payload');

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('payload');
  });

  it('should remove an event listener', () => {
    const mockCallback = vi.fn();
    const bus = useEventBus();

    bus.on('test-event', mockCallback);
    bus.off('test-event', mockCallback);
    bus.emit('test-event', 'payload');

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should not throw an error when emitting an event with no listeners', () => {
    const bus = useEventBus();
    expect(() => bus.emit('no-listeners')).not.toThrow();
  });

  it('should not emit an event if no listeners are registered for that event', () => {
    const bus = useEventBus();
    const mockCallback = vi.fn();

    bus.emit('non-existent-event', 'payload');

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
