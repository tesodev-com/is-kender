import type { Meta, StoryObj } from '@storybook/vue3';
import Skeleton from 'library-components/Skeleton';
import Swiper from 'library-components/Swiper';
import SwiperSlide from 'library-components/SwiperSlide';

const meta: Meta<typeof Swiper> = {
  title: 'Data-Display/Swiper',
  component: Swiper,
  tags: ['autodocs'],
  argTypes: {
    slidesPerView: {
      control: { type: 'number' },
    },
    slidesPerGroup: {
      control: { type: 'number' },
    },
    spaceBetween: {
      control: { type: 'number' },
    },
    initialSlide: {
      control: { type: 'number' },
    },
    speed: {
      control: { type: 'number' },
    },
    effect: {
      control: 'select',
      options: ['slide', 'fade'],
    },
    animationDuration: {
      control: { type: 'number' },
    },
    autoplay: {
      control: { type: 'boolean' },
    },
    autoplayDelay: {
      control: { type: 'number' },
    },
    navigation: {
      control: { type: 'boolean' },
    },
    pagination: {
      control: { type: 'boolean' },
    },
    fraction: {
      control: { type: 'boolean' },
    },
    loop: {
      control: { type: 'boolean' },
    },
    rewind: {
      control: { type: 'boolean' },
    },
    allowTouchMove: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Swiper>;
export const Default: Story = {
  args: {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 10,
    autoplay: false,
    autoplayDelay: 2000,
    navigation: true,
    pagination: true,
    fraction: true,
  },
  render: args => ({
    components: { Swiper, SwiperSlide, Skeleton },
    setup() {
      return { args };
    },
    template: `
        <Swiper v-bind="args">
          <SwiperSlide v-for="i in 10" :key="i" :style="{width: 25 + Math.random() * 50 + '%'}">
            <Skeleton height="200px" style="display: flex; justify-content: center; align-items: center; user-select: none;">
              Slide - {{ i - 1}}
            </Skeleton>
          </SwiperSlide>
        </Swiper>
        `,
  }),
};

export const Fade: Story = {
  args: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    effect: 'fade',
    autoplay: false,
    autoplayDelay: 2000,
    navigation: true,
    pagination: true,
    fraction: true,
  },
  render: args => ({
    components: { Swiper, SwiperSlide, Skeleton },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100%; height: 200px;">
        <Swiper v-bind="args">
          <SwiperSlide v-for="i in 10" :key="i">
            <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; user-select: none; background: #dadada;">
              <span>Slide - {{ i - 1}}</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
        `,
  }),
};
