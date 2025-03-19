import type { Meta, StoryObj } from '@storybook/vue3';
import Select, { type SelectProps } from 'library/Select';
import { arrowDownIcon, emailIcon } from '@/assets/icons';
import Svg from 'library/Svg';
import { ref } from 'vue';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Forms&Inputs/Select',
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of selectable options, each containing `value` and `label` properties.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed above the select dropdown.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when no option is selected.',
    },
    leftIcon: {
      control: 'text',
      description: 'Optional icon displayed on the left side of the select field.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the select field as required for form validation.',
    },
    hint: {
      control: 'text',
      description: 'A small hint text displayed below the select field.',
    },
    isMultiple: {
      control: 'boolean',
      description: 'Allows selection of multiple options when set to `true`.',
    },
    optionsPosition: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Determines where the dropdown options appear relative to the select field.',
    },
    optionsOffset: {
      control: 'number',
      description: 'Adjusts the spacing (in pixels) between the select field and the dropdown options.',
    },
    isSearch: {
      control: 'boolean',
      description: 'Enables a search input inside the dropdown for filtering options.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select field when set to `true`, preventing interaction.',
    },
    virtualScroll: {
      control: 'boolean',
      description: 'Enables virtual scrolling for large option lists to improve performance.',
    },
    itemHeight: {
      control: 'number',
      description: 'Height (in pixels) of each option item, used for virtual scroll calculations.',
    },
    virtualScrollBuffer: {
      control: 'number',
      description: 'Number of extra items rendered above and below the visible area in virtual scroll mode.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const commonArgs: Partial<SelectProps> = {
  options: [
    { label: 'Short Option 1', value: 'opt1' },
    { label: 'Medium Option 2', value: 'opt2' },
    { label: 'Cool Option 3', value: 'opt3' },
    { label: 'Simple Option 4', value: 'opt4' },
    { label: 'Quick Option 5', value: 'opt5' },
    { label: 'Nice Option 6', value: 'opt6' },
    { label: 'Fast Option 7', value: 'opt7' },
    { label: 'Very Long Option Name Here', value: 'long-opt', slotKey: 'long-opt' },
    { label: 'Disabled Long Option', value: 'long-opt-2', disabled: true },
    { label: 'Super Extended Choice', value: 'long-opt-3' },
    { label: 'Mega Detailed Item', value: 'long-opt-4' },
    { label: 'Extra Wide Selection', value: 'long-opt-5' },
    { label: 'Big Lengthy Option', value: 'long-opt-6' },
    { label: 'Huge Text Entry', value: 'long-opt-7' },
    { label: 'Giant Option Name', value: 'long-opt-8' },
    { label: 'Massive Label Here', value: 'long-opt-9' },
    { label: 'Enormous Option Text', value: 'long-opt-10' },
    { label: 'Long Winded Choice', value: 'long-opt-11' },
    { label: 'Broad Option Label', value: 'long-opt-12' },
    { label: 'Vast Selection Name', value: 'long-opt-13' },
    { label: 'Epic Option Title', value: 'long-opt-14' },
    { label: 'Grand Option Pick', value: 'long-opt-15' },
    { label: 'Stretched Option', value: 'long-opt-16' },
    { label: 'Ultimate Long Name', value: 'long-opt-17' },
    { label: 'Incredibly Detailed Option Description', value: 'long-opt-18' },
    { label: 'Super Long Name That Tests Width Limits', value: 'long-opt-19', disabled: true },
    { label: 'Verbose Selection For Testing Purposes', value: 'long-opt-21' },
    { label: 'Lengthy Option Name With Many Words', value: 'long-opt-22' },
    { label: 'Special @#$% Option', value: 'special-opt1' },
    { label: 'Numbered Option 123', value: 'num-opt1' },
    { label: 'Mixed Case OPTION', value: 'case-opt1' },
    { label: 'Super Short', value: 'short-opt8' },
    { label: 'Disabled Short', value: 'short-opt9', disabled: true },
    { label: 'Option Number Fifty', value: 'opt50' },
    { label: 'Beyond The Horizon Choice', value: 'long-opt-23' },
    { label: 'Final Stretch Option', value: 'long-opt-24' },
    { label: 'Endgame Selection', value: 'long-opt-25', disabled: true },
  ],
  placeholder: 'Select an option',
  hint: 'Here is the extra information',
  required: false,
  leftIcon: emailIcon,
};

const generateLargeOptions = () => {
  const largeOptions = [];
  for (let i = 1; i <= 100; i++) {
    const isDisabled = i % 50 === 0;
    largeOptions.push({
      label: `Option ${i}${isDisabled ? ' (Disabled)' : ''}`,
      value: `opt-${i}`,
      disabled: isDisabled,
    });
  }
  return largeOptions;
};

export const Default: Story = {
  args: {
    ...commonArgs,
    options: generateLargeOptions(),
    label: 'Select Dropdown',
    required: true,
    isSearch: true,
    virtualScroll: true,
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      const search = ref<string>('');
      return { args, selected, search, arrowDownIcon };
    },
    template: `
         <div style="height:500px">
           <Select v-model="selected" v-model:search="search" v-bind="args" />
            <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const DefaultMultiple: Story = {
  args: {
    ...commonArgs,
    label: 'Select Dropdown',
    required: true,
    isMultiple: true,
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string[]>([]);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div style="height:500px">
           <Select v-model:multiple="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
            <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const WithLabel: Story = {
  args: {
    ...commonArgs,
    label: 'Choose an option',
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div>
           <Select v-model="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
           <p>Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const WithLabelVirtualScroll: Story = {
  args: {
    ...commonArgs,
    label: 'Choose an option',
    virtualScroll: true,
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div>
           <Select v-model="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
           <p>Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const Required: Story = {
  args: {
    ...commonArgs,
    label: 'Required Field',
    required: true,
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div>
           <Select v-model="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
           <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const NoOptions: Story = {
  args: {
    ...commonArgs,
    options: [],
    label: 'Empty Select',
    placeholder: 'No options available',
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div>
           <Select v-model="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
           <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const NarrowContainer: Story = {
  args: {
    ...commonArgs,
    label: 'Narrow Select',
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div style="width: 150px; border: 1px dashed #ccc; padding: 10px;">
           <Select v-model="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
           <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};

export const BottomEdge: Story = {
  args: {
    ...commonArgs,
    label: 'Bottom Edge Select',
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div style="height: 300px; display: flex; flex-direction: column; justify-content: flex-end;">
           <Select v-model="selected" v-bind="args">
             <template #long-opt="{ label }">
               🎉 {{ label }} slot key
             </template>
           </Select>
           <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
         </div>
      `,
  }),
};
