import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { eventBus } from '.';

describe('EventBus', () => {
  beforeEach(() => {
    eventBus.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow components to listen to events with type-safe payloads', () => {
    const callback = vi.fn();
    eventBus.on<{ message: string }>('test-event', callback);

    eventBus.emit('test-event', { message: 'Hello, world!' });

    expect(callback).toHaveBeenCalledWith({ message: 'Hello, world!' });
  });

  it('should allow components to stop listening to events', () => {
    const callback = vi.fn();
    eventBus.on('test-event', callback);
    eventBus.off('test-event', callback);

    eventBus.emit('test-event', { message: 'Hello, world!' });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should allow components to emit events with type-safe payloads', () => {
    const callback = vi.fn();
    eventBus.on<{ message: string }>('test-event', callback);

    eventBus.emit('test-event', { message: 'Hello, world!' });

    expect(callback).toHaveBeenCalledWith({ message: 'Hello, world!' });
  });

  it('should allow multiple listeners for the same event', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    eventBus.on<{ message: string }>('test-event', callback1);
    eventBus.on<{ message: string }>('test-event', callback2);

    eventBus.emit('test-event', { message: 'Hello, world!' });

    expect(callback1).toHaveBeenCalledWith({ message: 'Hello, world!' });
    expect(callback2).toHaveBeenCalledWith({ message: 'Hello, world!' });
  });

  it('should not call listeners after they are removed', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    eventBus.on<{ message: string }>('test-event', callback1);
    eventBus.on<{ message: string }>('test-event', callback2);

    eventBus.off('test-event', callback1);

    eventBus.emit('test-event', { message: 'Hello, world!' });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith({ message: 'Hello, world!' });
  });

  it('should handle events with no listeners', () => {
    const callback = vi.fn();
    eventBus.emit('non-existent-event', { message: 'Hello, world!' });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should clear all listeners for a specific event', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    eventBus.on('event-1', callback1);
    eventBus.on('event-2', callback2);

    eventBus.clearEvent('event-1');

    eventBus.emit('event-1', { message: 'Hello, event 1!' });
    eventBus.emit('event-2', { message: 'Hello, event 2!' });

    expect(callback1).not.toHaveBeenCalled();

    expect(callback2).toHaveBeenCalledWith({ message: 'Hello, event 2!' });
  });
});