import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useResizeObserver } from '.';

describe('useResizeObserver', () => {
  let mockResizeObserver: any;
  let observeSpy: any;
  let disconnectSpy: any;

  beforeEach(() => {
    mockResizeObserver = vi.fn();
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    let isDisconnected = false;

    mockResizeObserver.mockImplementation((callback: any) => {
      return {
        observe: observeSpy,
        disconnect: () => {
          disconnectSpy();
          isDisconnected = true;
        },
        callback: (entries: ResizeObserverEntry[]) => {
          if (!isDisconnected) {
            callback(entries);
          }
        },
      };
    });

    window.ResizeObserver = mockResizeObserver;
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
        useResizeObserver({ elementRef });
      },
    };

    mount(TestComponent);

    expect(observeSpy).toHaveBeenCalledWith(element, { box: 'content-box' });
  });

  it('should disconnect the observer on unmount', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        useResizeObserver({ elementRef });
      },
    };

    const wrapper = mount(TestComponent);
    wrapper.unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should update rect ref when element resizes', () => {
    const element = document.createElement('div');
    const elementRef = ref(element);
    let rect: any;

    const TestComponent = {
      template: '<div ref="elementRef"></div>',
      setup() {
        rect = useResizeObserver({ elementRef });
        return { rect };
      },
    };

    mount(TestComponent);

    const entries = [
      {
        contentRect: {
          x: 10,
          y: 20,
          width: 100,
          height: 200,
          top: 20,
          left: 10,
          bottom: 220,
          right: 110,
        },
      },
    ];
    mockResizeObserver.mock.calls[0][0](entries);

    expect(rect.value).toEqual({
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      top: 20,
      left: 10,
      bottom: 220,
      right: 110,
    });
  });
});