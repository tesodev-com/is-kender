import { vSwipe } from '@/directives/vSwipe';
import { flushPromises, mount } from '@vue/test-utils';
import type { SwiperProps } from 'library-components/Swiper';
import SwiperSlide from 'library-components/SwiperSlide';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Swiper from './Swiper.vue';

const mockEffect = {
  init: vi.fn(),
  onSwipe: vi.fn(),
  slideTo: vi.fn(index => {
    return index;
  }),
};
vi.mock('@/components/Swiper/effect/useSlideEffect', async () => {
  return {
    default: vi.fn().mockReturnValue(mockEffect),
  };
});
vi.mock('@/components/Swiper/effect/useFadeEffect', async () => {
  return {
    default: vi.fn().mockReturnValue(mockEffect),
  };
});
vi.mock('@/assets/icons', () => ({
  keyboardArrowLeftIcon: 'left-icon',
  keyboardArrowRightIcon: 'right-icon',
}));
vi.mock('library-components/Swiper/core', () => ({
  Helpers: {
    generateUUID: vi.fn().mockReturnValue('test-uuid'),
    getModulo: vi.fn((value, total) => ((value % total) + total) % total),
    delayedExec: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('Swiper', () => {
  function createWrapper(props: SwiperProps = {}) {
    return mount(Swiper, {
      props,
      global: {
        directives: {
          swipe: vSwipe,
        },
        stubs: {
          Svg: true,
          SwiperSlide,
        },
      },
      slots: {
        default: Array.from({ length: 5 }, (_, i) => `<SwiperSlide :slide-index="${i}">Slide-${i}</SwiperSlide>`),
      },
    });
  }
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });
  it('renders correctly with default props', async () => {
    const wrapper = createWrapper();

    await flushPromises();

    expect(wrapper.find('.swiper').exists()).toBe(true);
    expect(wrapper.find('.swiper-wrapper').exists()).toBe(true);
  });
  it('shows navigation when enabled', async () => {
    const wrapper = createWrapper({ navigation: true });
    await flushPromises();

    expect(wrapper.find('.swiper-navigation-prev').exists()).toBe(true);
    expect(wrapper.find('.swiper-navigation-next').exists()).toBe(true);
  });
  it('shows pagination when enabled', async () => {
    const wrapper = createWrapper({ pagination: true });
    await flushPromises();

    expect(wrapper.find('.swiper-pagination').exists()).toBe(true);
  });
  it('shows fraction indicator when enabled', async () => {
    const wrapper = createWrapper({ fraction: true });
    await flushPromises();

    expect(wrapper.find('.swiper-fraction').exists()).toBe(true);
  });
  it('applies correct CSS variables based on props', async () => {
    const wrapper = createWrapper({ slidesPerView: 2, spaceBetween: 10 });
    await flushPromises();

    const style = wrapper.find('.swiper').attributes('style');
    expect(style).toContain('--slides-per-view: 2');
    expect(style).toContain('--space-between: 10px');
  });
  it('check slide classes based on active index', async () => {
    const wrapper = createWrapper();
    await flushPromises();

    expect(wrapper.findAll('.swiper-slide').length).toBe(5);
    expect(wrapper.findAll('.swiper-slide-active').length).toBe(1);
    expect(wrapper.find('.swiper-slide-active').text()).toBe('Slide-0');
    expect(wrapper.findAll('.swiper-slide-prev').length).toBe(0);
    expect(wrapper.findAll('.swiper-slide-next').length).toBe(1);
  });
});
