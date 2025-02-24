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
import type { ToastMessageProps, ToastProps } from 'library/Toast';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import ToastMessage from './ToastMessage.vue';
export type MessageProps = Partial<ToastMessageProps>;
const props = withDefaults(defineProps<ToastProps>(), {
  position: 'top-right',
  animation: 'slide-right',
  listReverse: false,
});
const messages = ref<(MessageProps & { id: number })[]>([]);
const messageId = ref<number>(0);
const toastClasses = computed(() => {
  return ['toast-group', `toast-group-${props.position}`, { 'toast-group-reverse': props.listReverse }];
});
onMounted(() => {
  EventBus.on('toast:add', add);
  EventBus.on('toast:remove', remove);
});
onBeforeUnmount(() => {
  EventBus.off('toast:add', add);
  EventBus.off('toast:remove', remove);
});
function add(message: MessageProps) {
  messages.value.push({ ...message, id: messageId.value++ });
}
function remove(id: number) {
  const index = messages.value.findIndex(message => message.id === id);
  if (index !== -1) {
    messages.value.splice(index, 1);
  }
}
</script>

<style lang="scss" scoped src="./Toast.styles.scss"></style>
