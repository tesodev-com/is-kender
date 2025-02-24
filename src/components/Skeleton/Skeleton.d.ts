import { type DefineComponent } from 'vue';

export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  shape?: 'circle' | 'rectangle';
  animation?: 'pulse' | 'wave' | 'none';
}

declare const Skeleton: DefineComponent<SkeletonProps>;

declare module 'vue' {
  export interface GlobalComponents {
    Skeleton: typeof Skeleton;
  }
}

export default Skeleton;
