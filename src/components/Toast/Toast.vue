<template>
  <Teleport to="body">
    <div :class="toastClasses">
      <transition-group :name="animation">
        <ToastMessage
          v-for="message in messages"
          :key="message.id"
          closable
          v-bind="message"
          @close="remove(message.id)"
        />
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { EventBus } from '@/utils';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import ToastMessage, { type ToastMessageProps } from './ToastMessage.vue';
import { ToastEvents } from './ToastServices';
export type MessageProps = Partial<ToastMessageProps>;
interface ToastProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animation?: 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down';
  listReverse?: boolean;
}
const props = withDefaults(defineProps<ToastProps>(), {
  position: 'top-right',
  animation: 'slide-right',
  listReverse: false,
});
const messages = ref<(MessageProps & {id: number})[]>([]);
const messageId = ref<number>(0);
const toastClasses = computed(() => {
  return ['toast-group', `toast-group-${props.position}`, { 'toast-group-reverse': props.listReverse }];
});
onMounted(() => {
  EventBus.on(ToastEvents.ADD, add);
  EventBus.on(ToastEvents.REMOVE, remove);
  EventBus.on(ToastEvents.REMOVE_ALL, removeAll);
});
onBeforeUnmount(() => {
  EventBus.off(ToastEvents.ADD, add);
  EventBus.off(ToastEvents.REMOVE, remove);
  EventBus.off(ToastEvents.REMOVE_ALL, removeAll);
});
function add(message: MessageProps) {
  messages.value.push({ ...message, id: messageId.value++ });
}
function remove(id: number) {
  const index = messages.value.findIndex((message) => message.id === id);
  if (index !== -1) {
    messages.value.splice(index, 1);
  }
}
function removeAll() {
  messages.value = [];
  messageId.value = 0;
}
</script>

<style lang="scss" scoped src="./Toast.styles.scss"></style>