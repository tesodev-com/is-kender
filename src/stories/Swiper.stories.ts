import type { Meta, StoryObj } from '@storybook/vue3';
import Skeleton from 'library/Skeleton';
import Swiper from 'library/Swiper';
import SwiperSlide from 'library/SwiperSlide';

const meta: Meta<typeof Swiper> = {
  title: 'Utility-Components/Swiper',
  component: Swiper,
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
    loop: {
      control: { type: 'boolean' },
    },
    allowTouchMove: {
      control: { type: 'boolean' },
    },
    autoplay: {
      control: { type: 'boolean' },
    },
    autoplayDelay: {
      control: { type: 'number' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Swiper>;
export const Default: Story = {
  args: {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 10,
    autoplay: false,
    autoplayDelay: 2000,
    loop: true,
  },
  render: args => ({
    components: { Swiper, SwiperSlide, Skeleton },
    setup() {
      return { args };
    },
    template: `
        <Swiper v-bind="args">
          <SwiperSlide v-for="i in 10" :key="i" :style="{width: Math.random() * 10 * 50 + 'px'}">
            <Skeleton height="200px" style="display: flex; justify-content: center; align-items: center; user-select: none;">
              Slide - {{ i - 1}}
            </Skeleton>
          </SwiperSlide>
        </Swiper>
        `,
  }),
};
