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
      description: 'Array of options for the select dropdown',
    },
    label: {
      control: 'text',
      description: 'Label for the select component',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    hint: {
      control: 'text',
      description: 'Hint text for extra information',
    },
    required: {
      control: 'boolean',
      description: 'Indicates if the field is required (shows an asterisk)',
    },
    isMultiple: {
      control: 'boolean',
      description: 'Enables multi-select mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select component',
    },
    leftIcon: {
      control: 'text',
      description: 'Icon source for the left side of the trigger',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const commonArgs: Partial<SelectProps> = {
  options: [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Option 4', value: 'opt4' },
    { label: 'Option 5', value: 'opt5' },
    { label: 'Option 6', value: 'opt6' },
    { label: 'Option 7', value: 'opt7' },
    { label: 'Very Long Option Name Here', value: 'long-opt', slotKey: 'long-opt' },
    { label: 'Very Long Option Name Here 2', value: 'long-opt-2', disabled: true },
    { label: 'Very Very Very Long Option Name Here 2', value: 'long-opt-3' },
  ],
  placeholder: 'Select an option',
  hint: 'Here is the extra information',
  required: false,
  leftIcon: emailIcon,
};

export const Default: Story = {
  args: {
    ...commonArgs,
    label: 'Select Dropdown',
    required: true,
  },
  render: args => ({
    components: { Select, Svg },
    setup() {
      const selected = ref<string | number | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
         <div style="height:500px">
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
      const selected = ref<string[] | number[]>([]);
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
      const selected = ref<string | number | null>(null);
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
      const selected = ref<string | number | null>(null);
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
      const selected = ref<string | number | null>(null);
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
      const selected = ref<string | number | null>(null);
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
      const selected = ref<string | number | null>(null);
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
