import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useIntersectionObserver } from '.';

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: any;
  let observeSpy: any;
  let disconnectSpy: any;

  beforeEach(() => {
    mockIntersectionObserver = vi.fn();
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    let isDisconnected = false;

    mockIntersectionObserver.mockImplementation((callback: any) => {
      return {
        observe: observeSpy,
        disconnect: () => {
          disconnectSpy();
          isDisconnected = true;
        },
        callback: (entries: IntersectionObserverEntry[]) => {
          if (!isDisconnected) {
            callback(entries);
          }
        },
      };
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should observe the target element', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        useIntersectionObserver({ elementRef });
      },
    };

    mount(TestComponent);

    expect(observeSpy).toHaveBeenCalledWith(element);
  });

  it('should disconnect the observer on unmount', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        useIntersectionObserver({ elementRef });
      },
    };

    const wrapper = mount(TestComponent);
    wrapper.unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should trigger callback when element intersects', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);
    const callback = vi.fn();

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        useIntersectionObserver({ elementRef, callback });
      },
    };

    mount(TestComponent);

    const entries = [{ isIntersecting: true }];
    mockIntersectionObserver.mock.calls[0][0](entries);

    expect(callback).toHaveBeenCalledWith(entries);
  });

  it('should trigger callback only once if triggerOnce is true', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);
    const callback = vi.fn();

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        useIntersectionObserver({ elementRef, callback, options: { triggerOnce: true, threshold: 0 } });
      },
    };

    mount(TestComponent);

    const entries = [{ isIntersecting: true }];
    const observerInstance = mockIntersectionObserver.mock.results[0].value;

    observerInstance.callback(entries);

    expect(callback).toHaveBeenCalledTimes(1);

    expect(disconnectSpy).toHaveBeenCalledTimes(1);

    observerInstance.callback(entries);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not trigger callback if element does not intersect', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);
    const callback = vi.fn();

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        useIntersectionObserver({ elementRef, callback });
      },
    };

    mount(TestComponent);

    const entries = [{ isIntersecting: false }];
    mockIntersectionObserver.mock.calls[0][0](entries);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should return isIntersecting ref', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);
    let isIntersecting: any;

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        isIntersecting = useIntersectionObserver({ elementRef });
        return { isIntersecting };
      },
    };

    mount(TestComponent);

    expect(isIntersecting.value).toBe(false);

    const entries = [{ isIntersecting: true }];
    mockIntersectionObserver.mock.calls[0][0](entries);

    expect(isIntersecting.value).toBe(true);
  });
});
