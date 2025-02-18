import type { Meta, StoryObj } from '@storybook/vue3';
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'The current progress value (0 to 100).',
    },
    maxValue: {
      control: { type: 'number', min: 1 },
      description: 'The maximum value for the progress bar (default is 100).',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to display the progress percentage.',
    },
    percentageLocation: {
      control: 'select',
      options: ['right', 'bottom'],
      description: 'The location of the percentage text (right or bottom).',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Whether to display a tooltip with the progress percentage.',
    },
    hoverTooltip: {
      control: 'boolean',
      description: 'Whether the tooltip should only appear on hover.',
    },
    tooltipLocation: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'The location of the tooltip (top or bottom).',
    },
  },
  args: {
    value: 50,
    maxValue: 100,
    showPercentage: false,
    percentageLocation: 'right',
    showTooltip: false,
    hoverTooltip: false,
    tooltipLocation: 'top',
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const WithPercentageRight: Story = {
  args: {
    value: 75,
    showPercentage: true,
    percentageLocation: 'right',
  },
};

export const WithPercentageBottom: Story = {
  args: {
    value: 25,
    showPercentage: true,
    percentageLocation: 'bottom',
  },
};

export const WithTooltipTop: Story = {
  args: {
    value: 60,
    showTooltip: true,
    tooltipLocation: 'top',
  },
};

export const WithTooltipBottom: Story = {
  args: {
    value: 40,
    showTooltip: true,
    tooltipLocation: 'bottom',
  },
};

export const WithHoverTooltip: Story = {
  args: {
    value: 80,
    showTooltip: true,
    hoverTooltip: true,
    tooltipLocation: 'top',
  },
};

export const WithCustomMaxValue: Story = {
  args: {
    value: 50,
    maxValue: 200,
    showPercentage: true,
    percentageLocation: 'right',
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
    showPercentage: true,
    percentageLocation: 'right',
  },
};

export const EmptyProgress: Story = {
  args: {
    value: 0,
    showPercentage: true,
    percentageLocation: 'right',
  },
};