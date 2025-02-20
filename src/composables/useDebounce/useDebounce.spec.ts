import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from '.';

describe('useDebounce', () => {
  let mockFn: typeof vi.fn;
  let debouncedFn: (...args: any[]) => void;
  let cancel: () => void;
  const delay = 300;

  beforeEach(() => {
    mockFn = vi.fn();
    const debounceInstance = useDebounce(mockFn, delay);
    debouncedFn = debounceInstance.debouncedFn;
    cancel = debounceInstance.cancel;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should debounce function calls', async () => {
    vi.useFakeTimers();

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(delay);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should call the function with the latest arguments', async () => {
    vi.useFakeTimers();

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    vi.advanceTimersByTime(delay);
    expect(mockFn).toHaveBeenCalledWith('third');
  });

  it('should cancel the scheduled function call', async () => {
    vi.useFakeTimers();

    debouncedFn();
    cancel();
    vi.advanceTimersByTime(delay);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
