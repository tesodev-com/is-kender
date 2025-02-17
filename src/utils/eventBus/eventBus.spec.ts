import { describe, it, expect, vi } from 'vitest';
import EventBus from '.';

describe('EventBus', () => {
  it('should register an event listener and call it when the event is emitted', () => {
    const mockCallback = vi.fn();

    EventBus.on('test-event', mockCallback);
    EventBus.emit('test-event', 'payload');

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('payload');
  });

  it('should register multiple listeners for the same event', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();

    EventBus.on('multi-event', mockCallback1);
    EventBus.on('multi-event', mockCallback2);
    EventBus.emit('multi-event', 'data');

    expect(mockCallback1).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledTimes(1);
    expect(mockCallback1).toHaveBeenCalledWith('data');
    expect(mockCallback2).toHaveBeenCalledWith('data');
  });

  it('should not call a listener after it has been removed', () => {
    const mockCallback = vi.fn();

    EventBus.on('remove-event', mockCallback);
    EventBus.off('remove-event', mockCallback);
    EventBus.emit('remove-event');

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should not throw an error if removing a listener that does not exist', () => {
    const mockCallback = vi.fn();
    expect(() => EventBus.off('non-existent-event', mockCallback)).not.toThrow();
  });

  it('should not emit events that have no listeners', () => {
    expect(() => EventBus.emit('unregistered-event')).not.toThrow();
  });
});
