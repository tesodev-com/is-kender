import type { Meta, StoryObj } from '@storybook/vue3';
import TreeSelect, { type TreeSelectProps } from 'library-components/TreeSelect';
import { arrowDownIcon, emailIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { ref } from 'vue';

const meta: Meta<typeof TreeSelect> = {
  component: TreeSelect,
  title: 'Forms&Inputs/TreeSelect',
  argTypes: {
    treeOptions: {
      control: 'object',
      description: 'Array of tree-structured options, each containing `value`, `label`, and optional `children`.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed above the tree-select dropdown.',
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
      description: 'Marks the tree-select field as required for form validation.',
    },
    hint: {
      control: 'text',
      description: 'A small hint text displayed below the tree-select field.',
    },
    isMultiple: {
      control: 'boolean',
      description: 'Allows selection of multiple options when set to `true`.',
    },
    selectAllChild: {
      control: 'boolean',
      description: 'Automatically selects all child nodes when a parent node is selected, if set to `true`.',
    },
    optionsPosition: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Determines where the dropdown options appear relative to the tree-select field (only top/bottom supported).',
    },
    optionsOffset: {
      control: 'number',
      description: 'Adjusts the spacing (in pixels) between the tree-select field and the dropdown options.',
    },
    isSearch: {
      control: 'boolean',
      description: 'Enables a search input inside the dropdown for filtering tree options.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tree-select field when set to `true`, preventing interaction.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TreeSelect>;

const commonArgs: Partial<TreeSelectProps> = {
  treeOptions: [
    {
      label: 'Categories',
      value: 'cat',
      children: [
        {
          label: 'Electronics',
          value: 'elec',
          children: [
            { label: 'Phones', value: 'phones' },
            { label: 'Laptops', value: 'laptops' },
            { label: 'Accessories', value: 'acc', disabled: true },
          ],
        },
        {
          label: 'Clothing',
          value: 'cloth',
          children: [
            {
              label: 'Men',
              value: 'men',
              children: [
                { label: 'Shirts', value: 'shirts' },
                { label: 'Pants', value: 'pants' },
              ],
            },
            {
              label: 'Women',
              value: 'women',
              disabled: true,
              children: [
                { label: 'Dresses', value: 'dresses' },
                { label: 'Skirts', value: 'skirts', disabled: true },
              ],
            },
            { label: 'Kids', value: 'kids' },
          ],
        },
        {
          label: 'Books',
          value: 'books',
          children: [
            { label: 'Fiction', value: 'fiction' },
            { label: 'Non-Fiction', value: 'nonfiction' },
          ],
        },
      ],
    },
    {
      label: 'Locations',
      value: 'loc',
      children: [
        {
          label: 'North America',
          value: 'na',
          children: [
            { label: 'USA', value: 'usa' },
            { label: 'Canada', value: 'canada' },
            { label: 'Mexico', value: 'mexico', disabled: true },
          ],
        },
        {
          label: 'Europe',
          value: 'eu',
          children: [
            {
              label: 'France',
              value: 'fr',
              children: [
                { label: 'Paris', value: 'paris' },
                { label: 'Lyon', value: 'lyon' },
              ],
            },
            {
              label: 'Germany',
              value: 'de',
              children: [
                { label: 'Berlin', value: 'berlin' },
                { label: 'Munich', value: 'munich', disabled: true },
              ],
            },
            { label: 'Italy', value: 'it' },
          ],
        },
        {
          label: 'Asia',
          value: 'asia',
          children: [
            { label: 'Japan', value: 'jp' },
            { label: 'China', value: 'cn' },
          ],
        },
      ],
    },
    {
      label: 'Miscellaneous',
      value: 'misc',
      children: [
        { label: 'Tools', value: 'tools' },
        {
          label: 'Furniture',
          value: 'furn',
          children: [
            { label: 'Chairs', value: 'chairs' },
            { label: 'Tables', value: 'tables' },
          ],
        },
      ],
    },
  ],
  placeholder: 'Select an option',
  hint: 'Select categories or locations',
  required: false,
  leftIcon: emailIcon,
};

export const Default: Story = {
  args: {
    ...commonArgs,
    label: 'Tree Select Dropdown',
    required: true,
    isSearch: true,
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string | null>(null);
      const search = ref<string>('');
      return { args, selected, search, arrowDownIcon };
    },
    template: `
      <div style="height: 500px">
        <TreeSelect v-model="selected" v-model:search="search" v-bind="args" />
        <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
      </div>
    `,
  }),
};

export const DefaultMultiple: Story = {
  args: {
    ...commonArgs,
    label: 'Multi-Select Tree Dropdown',
    required: true,
    isMultiple: true,
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string[]>([]);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div style="height: 500px">
        <TreeSelect v-model:multiple="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected values: {{ selected }}</p>
      </div>
    `,
  }),
};

export const MultipleWithSelectAllChild: Story = {
  args: {
    ...commonArgs,
    label: 'Multi-Select Tree Dropdown',
    required: true,
    isMultiple: true,
    selectAllChild: true,
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string[]>([]);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div style="height: 500px">
        <TreeSelect v-model:multiple="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected values: {{ selected }}</p>
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  args: {
    ...commonArgs,
    label: 'Choose a category',
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div>
        <TreeSelect v-model="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    ...commonArgs,
    label: 'Required Tree Field',
    required: true,
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div>
        <TreeSelect v-model="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
      </div>
    `,
  }),
};

export const NoOptions: Story = {
  args: {
    ...commonArgs,
    treeOptions: [],
    label: 'Empty Tree Select',
    placeholder: 'No options available',
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div>
        <TreeSelect v-model="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
      </div>
    `,
  }),
};

export const NarrowContainer: Story = {
  args: {
    ...commonArgs,
    label: 'Narrow Tree Select',
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div style="width: 150px; border: 1px dashed #ccc; padding: 10px;">
        <TreeSelect v-model="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
      </div>
    `,
  }),
};

export const BottomEdge: Story = {
  args: {
    ...commonArgs,
    label: 'Bottom Edge Tree Select',
  },
  render: args => ({
    components: { TreeSelect, Svg },
    setup() {
      const selected = ref<string | null>(null);
      return { args, selected, arrowDownIcon };
    },
    template: `
      <div style="height: 300px; display: flex; flex-direction: column; justify-content: flex-end;">
        <TreeSelect v-model="selected" v-bind="args" />
        <p style="padding-top: 96px;">Selected value: {{ selected }}</p>
      </div>
    `,
  }),
};
