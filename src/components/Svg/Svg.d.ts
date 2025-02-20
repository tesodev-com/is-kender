import type { DefineComponent } from 'vue';

export interface SvgProps {
  src?: string;
  name?: string;
  size?: string;
  style?: string;
}

declare const Svg: DefineComponent<any, any>;

export default Svg;
