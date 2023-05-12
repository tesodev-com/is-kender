import Button from '../Button.vue';
import CircleIcon from '../../icons/CircleIcon.vue';
export default {
   title: 'Components/Button',
   component: Button,
   argTypes: {
      default: {
         control: {
            type: 'text',
         },
      },
      size: {
         options: ['small', 'medium', 'large'],
         control: 'select',
      },
      type: {
         options: ['primary', 'secondary', 'ghost'],
         control: 'select',
      },
   },
};

const Template = (args) => ({
   // Components used in your story `template` are defined in the `components` object
   components: { Button },
   // The story's `args` need to be mapped into the template through the `setup()` method
   setup() {
      return { args };
   },
   // And then the `args` are bound to your component with `v-bind="args"`
   template: `<Button v-bind="args"></Button>`,
});

export const Primary = Template.bind({});

Primary.args = {
   text: 'Button',
   type: 'primary',
   size: 'small',
   shadow: false,
   rounded: false,
   isLoading: false,
   isDisabled: false,
   iconLeft: CircleIcon,
   iconRight: CircleIcon,
};

export const Secondary = Template.bind({});

Secondary.args = {
   ...Primary.args,
   default: 'Button',
   type: 'secondary',
};

export const Ghost = Template.bind({});

Ghost.args = {
   ...Primary.args,
   default: 'Button',
   type: 'ghost',
   iconLeft: CircleIcon,
   iconRight: CircleIcon,
};
