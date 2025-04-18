import type { Meta, StoryObj } from '@storybook/vue3';
import OTPInput from 'library-components/OtpInput';
import { ref } from 'vue';

const meta: Meta<typeof OTPInput> = {
  component: OTPInput,
  title: 'Form/OtpInput',
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the OTP inputs.',
    },
    digits: {
      control: 'number',
      description: 'Number of OTP input fields.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed above the OTP inputs.',
    },
    hint: {
      control: 'text',
      description: 'A small hint text displayed below the OTP inputs.',
    },
    showDivider: {
      control: 'boolean',
      description: 'Shows a divider in the middle of the OTP inputs (works with even digits).',
    },
    isPassword: {
      control: 'boolean',
      description: 'Toggles between text and password input types.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder character for each OTP input field.',
    },
    numericOnly: {
      control: 'boolean',
      description: 'Restricts input to numeric characters.',
    },
    focusOnMount: {
      control: 'boolean',
      description: 'Focuses the first input on component mount when set to `true`.',
    },
    error: {
      control: 'boolean',
      description: 'Shows an error state when set to `true`.',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when the error state is active.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OTPInput>;

const commonArgs = {
  digits: 4,
  placeholder: '0',
  hint: 'Enter the code sent to your device',
  showDivider: false,
  isPassword: false,
  focusOnMount: false,
};

export const Default: Story = {
  args: {
    ...commonArgs,
    label: 'Enter OTP',
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const WithDivider: Story = {
  args: {
    ...commonArgs,
    digits: 6,
    label: 'OTP with Divider',
    showDivider: true,
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const PasswordType: Story = {
  args: {
    ...commonArgs,
    label: 'Secure OTP',
    isPassword: true,
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const NoFocusOnMount: Story = {
  args: {
    ...commonArgs,
    label: 'Manual Focus OTP',
    focusOnMount: false,
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const FourDigits: Story = {
  args: {
    ...commonArgs,
    label: 'Short OTP',
    digits: 4,
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const WithCustomHint: Story = {
  args: {
    ...commonArgs,
    label: 'OTP with Custom Hint',
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args">
          <template #hint="{ hint }">
            <span style="color: blue;">🔒 {{ hint }} (customized)</span>
          </template>
        </OTPInput>
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const NonNumericInput: Story = {
  args: {
    ...commonArgs,
    label: 'Non-Numeric OTP',
    numericOnly: false,
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="height: 300px">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};

export const NarrowContainer: Story = {
  args: {
    ...commonArgs,
    label: 'Narrow OTP',
  },
  render: args => ({
    components: { OTPInput },
    setup() {
      const otp = ref('');
      return { args, otp };
    },
    template: `
      <div style="width: 200px; border: 1px dashed #ccc; padding: 10px;">
        <OTPInput v-model="otp" v-bind="args" />
        <p style="padding-top: 48px;">Entered OTP: {{ otp }}</p>
      </div>
    `,
  }),
};
