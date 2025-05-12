import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue';

declare type VueProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;

export interface DefineComponent<Props = object, Slots = object, Emits = object, Methods = object, Exposed = object> {
  new (): {
    $props: Props & VueProps;
    $slots: Slots;
    $emit: Emits;
  } & Methods &
    Exposed;
}
