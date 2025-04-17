/* STORY */

import type { Meta, StoryObj } from '@storybook/vue3';
import RangeSlider from 'library-components/RangeSlider';
import { ref } from 'vue';

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
  title: 'Form/RangeSlider',
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    unit: { control: 'text' },
    label: { control: 'text' },
    alwaysReturnWithUnit: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'],
    },
    isRange: { control: 'boolean' },
    thumbShape: {
      control: 'inline-radio',
      options: ['circle', 'square'],
      defaultValue: 'circle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    label: 'Value',
    alwaysReturnWithUnit: false,
    color: 'danger',
    thumbShape: 'circle',
  },
  render: args => ({
    components: { RangeSlider },
    setup() {
      const modelValue = ref<number>(50);

      return { args, modelValue };
    },
    template: `
        <RangeSlider 
          v-model="modelValue" 
          :min="args.min" 
          :max="args.max" 
          :step="args.step" 
          :unit="args.unit" 
          :label="args.label" 
          :always-return-with-unit="args.alwaysReturnWithUnit"
          :color="args.color"
          :thumb-shape="args.thumbShape"
        />
    `,
  }),
};

export const WithUnit: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
    label: 'Size',
    alwaysReturnWithUnit: true,
    color: 'primary',
    thumbShape: 'circle',
  },
  render: args => ({
    components: { RangeSlider },
    setup() {
      const modelValue = ref<string>('50px');

      return { args, modelValue };
    },
    template: `
        <RangeSlider 
          v-model="modelValue" 
          :min="args.min" 
          :max="args.max" 
          :step="args.step" 
          :unit="args.unit" 
          :label="args.label" 
          :always-return-with-unit="args.alwaysReturnWithUnit"
          :color="args.color"
          :thumb-shape="args.thumbShape"
        />
    `,
  }),
};

export const CustomRange: Story = {
  args: {
    min: 10,
    max: 200,
    step: 5,
    unit: 'kg',
    label: 'Weight',
    alwaysReturnWithUnit: true,
    color: 'primary',
    thumbShape: 'circle',
  },
  render: args => ({
    components: { RangeSlider },
    setup() {
      const modelValue = ref<string>('100kg');
      return { args, modelValue };
    },
    template: `
        <RangeSlider 
          v-model="modelValue" 
          :min="args.min" 
          :max="args.max" 
          :step="args.step" 
          :unit="args.unit" 
          :label="args.label" 
          :always-return-with-unit="args.alwaysReturnWithUnit"
          :color="args.color"
          :thumb-shape="args.thumbShape"
        />
    `,
  }),
};

export const RangeMode: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
    label: 'Range',
    alwaysReturnWithUnit: true,
    color: 'dark',
    isRange: true,
    thumbShape: 'square',
  },
  render: args => ({
    components: { RangeSlider },
    setup() {
      const modelValue = ref([30, 50]);

      return { args, modelValue };
    },
    template: `
        <RangeSlider 
          v-model="modelValue" 
          :min="args.min" 
          :max="args.max" 
          :step="args.step" 
          :unit="args.unit" 
          :label="args.label" 
          :always-return-with-unit="args.alwaysReturnWithUnit"
          :color="args.color"
          :is-range="args.isRange"
          :thumb-shape="args.thumbShape"
        />
    `,
  }),
};
