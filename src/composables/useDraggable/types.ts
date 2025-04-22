import type { Ref } from 'vue';

export type MaybeRefOrGetter<T> = T | Ref<T> | (() => T);
export type PointerType = 'mouse' | 'touch' | 'pen';
export interface Position {
  x: number;
  y: number;
}
export interface UseDraggableOptions {
  /**
   * Only start the dragging when click on the element directly
   *
   * @default false
   */
  exact?: MaybeRefOrGetter<boolean>;

  /**
   * Prevent events defaults
   *
   * @default false
   */
  preventDefault?: MaybeRefOrGetter<boolean>;

  /**
   * Prevent events propagation
   *
   * @default false
   */
  stopPropagation?: MaybeRefOrGetter<boolean>;

  /**
   * Whether dispatch events in capturing phase
   *
   * @default true
   */
  capture?: boolean;

  /**
   * Element to attach `pointermove` and `pointerup` events to.
   *
   * @default window
   */
  draggingElement?: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>;

  /**
   * Element for calculating bounds (If not set, it will use the event's target).
   *
   * @default undefined
   */
  containerElement?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>;

  /**
   * Handle that triggers the drag event
   *
   * @default target
   */
  handle?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>;

  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[];

  /**
   * Initial position of the element.
   *
   * @default { x: 0, y: 0 }
   */
  initialValue?: MaybeRefOrGetter<Position>;

  /**
   * Constraints for the draggable area
   */
  constraints?: {
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
  };

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false;

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void;

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void;

  /**
   * Axis to drag on.
   *
   * @default 'both'
   */
  axis?: 'x' | 'y' | 'both';

  /**
   * Disabled drag and drop.
   *
   * @default false
   */
  disabled?: MaybeRefOrGetter<boolean>;

  /**
   * Mouse buttons that are allowed to trigger drag events.
   *
   * - `0`: Main button, usually the left button or the un-initialized state
   * - `1`: Auxiliary button, usually the wheel button or the middle button (if present)
   * - `2`: Secondary button, usually the right button
   * - `3`: Fourth button, typically the Browser Back button
   * - `4`: Fifth button, typically the Browser Forward button
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
   * @default [0]
   */
  buttons?: MaybeRefOrGetter<number[]>;
}

export interface UseDraggableReturn {
  isDragging: Ref<boolean>;
  position: Ref<Position>;
  style: Ref<string>;
}
