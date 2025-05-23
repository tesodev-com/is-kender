import type { Ref } from 'vue';
import { computed, ref, toRef, unref, watchEffect } from 'vue';
import type { MaybeRefOrGetter, PointerType, Position, UseDraggableOptions, UseDraggableReturn } from './types';

const isClient = typeof window !== 'undefined';

function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function' ? (r as () => T)() : unref(r);
}

function toRefs<T extends object>(obj: T) {
  const result: Record<string, Ref> = {};
  for (const key in obj) {
    result[key] = toRef(obj as any, key);
  }
  return result as { [K in keyof T]: Ref<T[K]> };
}

const defaultWindow = isClient ? window : undefined;

/**
 * Make elements draggable.
 *
 * @param target
 * @param options
 */
export function useDraggable(target: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>, options: UseDraggableOptions = {}): UseDraggableReturn {
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
