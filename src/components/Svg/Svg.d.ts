import { type DefineComponent } from 'vue';

export interface SvgProps {
  src?: string;
  name?: string;
  size?: string;
  style?: string;
}

declare const Svg: DefineComponent<SvgProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibSvg: typeof Svg;
  }
}

export default Svg;
