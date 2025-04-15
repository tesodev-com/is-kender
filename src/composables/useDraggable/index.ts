import type { Ref } from 'vue';
import { computed, ref, toRef, unref, watchEffect } from 'vue';

// Gerekli tip tanımlamaları
export type MaybeRefOrGetter<T> = T | Ref<T> | (() => T);
export type PointerType = 'mouse' | 'touch' | 'pen';
export interface Position {
  x: number;
  y: number;
}

// isClient yardımcı fonksiyonu
const isClient = typeof window !== 'undefined';

// toValue yardımcı fonksiyonu
function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function' ? (r as () => T)() : unref(r);
}

// toRefs yardımcı fonksiyonu
function toRefs<T extends object>(obj: T) {
  const result: Record<string, Ref> = {};
  for (const key in obj) {
    result[key] = toRef(obj as any, key);
  }
  return result as { [K in keyof T]: Ref<T[K]> };
}

// defaultWindow
const defaultWindow = isClient ? window : undefined;

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

/**
 * Make elements draggable.
 *
 * @param target
 * @param options
 */
export default function useDraggable(target: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>, options: UseDraggableOptions = {}): UseDraggableReturn {
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = 'both',
    draggingElement = defaultWindow,
    containerElement,
    handle: draggingHandle = target,
    buttons = [0],
    constraints,
  } = options;
  const position = ref<Position>(toValue(initialValue) ?? { x: 0, y: 0 });
  const pressedDelta = ref<Position>();

  const filterEvent = (e: PointerEvent) => {
    if (pointerTypes) return pointerTypes.includes(e.pointerType as PointerType);
    return true;
  };

  const handleEvent = (e: PointerEvent) => {
    if (toValue(preventDefault)) e.preventDefault();
    if (toValue(stopPropagation)) e.stopPropagation();
  };

  const start = (e: PointerEvent) => {
    if (!toValue(buttons).includes(e.button)) return;
    if (toValue(options.disabled) || !filterEvent(e)) return;
    if (toValue(exact) && e.target !== toValue(target)) return;

    const container = toValue(containerElement);
    const containerRect = container?.getBoundingClientRect?.();
    const targetRect = toValue(target)!.getBoundingClientRect();
    const pos = {
      x: e.clientX - (container ? targetRect.left - containerRect!.left + container.scrollLeft : targetRect.left),
      y: e.clientY - (container ? targetRect.top - containerRect!.top + container.scrollTop : targetRect.top),
    };
    if (onStart?.(pos, e) === false) return;
    pressedDelta.value = pos;
    handleEvent(e);
  };

  const move = (e: PointerEvent) => {
    if (toValue(options.disabled) || !filterEvent(e)) return;
    if (!pressedDelta.value) return;
    const container = toValue(containerElement);
    const targetRect = toValue(target)!.getBoundingClientRect();
    let { x, y } = position.value;
    if (axis === 'x' || axis === 'both') {
      x = e.clientX - pressedDelta.value.x;
      if (container) x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width);

      // Apply constraints if provided
      if (constraints) {
        if (constraints.minX !== undefined) x = Math.max(constraints.minX, x);
        if (constraints.maxX !== undefined) x = Math.min(constraints.maxX, x);
      }
    }
    if (axis === 'y' || axis === 'both') {
      y = e.clientY - pressedDelta.value.y;
      if (container) y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height);

      // Apply constraints if provided
      if (constraints) {
        if (constraints.minY !== undefined) y = Math.max(constraints.minY, y);
        if (constraints.maxY !== undefined) y = Math.min(constraints.maxY, y);
      }
    }
    position.value = {
      x,
      y,
    };
    onMove?.(position.value, e);
    handleEvent(e);
  };

  const end = (e: PointerEvent) => {
    if (toValue(options.disabled) || !filterEvent(e)) return;
    if (!pressedDelta.value) return;
    pressedDelta.value = undefined;
    onEnd?.(position.value, e);
    handleEvent(e);
  };

  watchEffect(onCleanup => {
    if (!isClient) return;

    const config = {
      capture: options.capture ?? true,
      passive: !toValue(preventDefault),
    };

    const handleEl = toValue(draggingHandle);
    const draggingEl = toValue(draggingElement);

    const handlePointerDown = (e: Event) => start(e as PointerEvent);
    const handlePointerMove = (e: Event) => move(e as PointerEvent);
    const handlePointerUp = (e: Event) => end(e as PointerEvent);

    handleEl?.addEventListener('pointerdown', handlePointerDown, config);
    draggingEl?.addEventListener('pointermove', handlePointerMove, config);
    draggingEl?.addEventListener('pointerup', handlePointerUp, config);

    onCleanup(() => {
      handleEl?.removeEventListener('pointerdown', handlePointerDown, config);
      draggingEl?.removeEventListener('pointermove', handlePointerMove, config);
      draggingEl?.removeEventListener('pointerup', handlePointerUp, config);
    });
  });

  return {
    ...toRefs(position),
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(() => `left:${position.value.x}px;top:${position.value.y}px;`),
  };
}
