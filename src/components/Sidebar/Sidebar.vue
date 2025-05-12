<template>
  <Teleport
    v-if="isMobile"
    to="body"
  >
    <transition :name="computeAnimationName">
      <aside
        v-if="isSidebarOpen"
        :class="sidebarClasses"
      >
        <div
          v-if="title || $slots.title"
          class="sidebar-title"
        >
          <slot name="title">
            <h3>{{ title }}</h3>
          </slot>
        </div>
        <nav
          v-if="links.length > 0"
          class="sidebar-nav"
        >
          <SidebarItem
            v-for="(link, linkIndex) in links"
            :key="link.href"
            :link="link"
            :index="linkIndex"
            :useRouter="useRouter"
            @toggle="toggleLink"
          >
            <template
              v-for="(_, slot) in $slots"
              #[slot]="scope: SidebarLink"
            >
              <slot
                :name="slot"
                v-bind="scope as SidebarLink"
              />
            </template>
          </SidebarItem>
        </nav>
        <div
          v-if="$slots.bottom"
          class="sidebar-bottom"
        >
          <slot name="bottom"></slot>
        </div>
      </aside>
    </transition>
    <transition name="fade">
      <div
        v-if="computeShowBackdrop"
        class="sidebar-backdrop"
        @click="closeSidebar"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="computeShowBackdrop"
        class="sidebar-close-icon"
        :class="[`sidebar-close-icon-${position}`]"
        @click="closeOnOutsideClick && closeSidebar"
      >
        <Svg
          :src="closeIcon"
          size="24"
        ></Svg>
      </div>
    </transition>
  </Teleport>
  <aside
    v-if="!isMobile"
    :class="sidebarClasses"
  >
    <div
      v-if="title || $slots.title"
      class="sidebar-title"
    >
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    <nav
      v-if="links.length > 0"
      class="sidebar-nav"
    >
      <SidebarItem
        v-for="(link, linkIndex) in links"
        :key="link.href"
        :link="link"
        :index="linkIndex"
        :useRouter="useRouter"
        @toggle="toggleLink"
      >
        <template
          v-for="(_, slot) in $slots"
          #[slot]="scope: SidebarLink"
        >
          <slot
            :name="slot"
            v-bind="scope as SidebarLink"
          />
        </template>
      </SidebarItem>
    </nav>
    <div
      v-if="$slots.bottom"
      class="sidebar-bottom"
    >
      <slot name="bottom"></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
// imports
import { closeIcon } from '@/assets/icons';
import { EventBus } from '@/utils';
import Svg from 'library-components/Svg';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import SidebarItem from './SidebarItem.vue';
import type { SidebarEmits, SidebarLink, SidebarProps, SidebarSlots } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<SidebarProps>(), {
  title: 'Sidebar',
  closeOnOutsideClick: true,
  closeOnEscape: true,
  useRouter: true,
  position: 'left',
  isMobile: false,
});

// defineEmits
const emit = defineEmits<SidebarEmits>();

// defineSlots
defineSlots<SidebarSlots>();

// states (refs and reactives)
const isSidebarOpen = ref(false);

// computed
const sidebarClasses = computed(() => {
  return ['sidebar', { 'sidebar-mobile': props.isMobile, [`sidebar-${props.position}`]: props.isMobile }];
});

const computeAnimationName = computed(() => {
  return `sidebar-slide-${props.position}`;
});

const computeShowBackdrop = computed(() => {
  return props.isMobile && isSidebarOpen.value;
});

// watchers

// lifecycles
onMounted(() => {
  EventBus.on('sidebar:open', openSidebar);
  EventBus.on('sidebar:close', closeSidebar);
  document.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
  EventBus.off('sidebar:open', openSidebar);
  EventBus.off('sidebar:close', closeSidebar);
  document.removeEventListener('keydown', handleEscapeKey);
});

// methods
function openSidebar(cb?: () => void) {
  isSidebarOpen.value = true;
  cb?.();
}

function closeSidebar() {
  isSidebarOpen.value = false;
  emit('close');
}

function handleEscapeKey(event: KeyboardEvent) {
  if (isSidebarOpen.value && props.closeOnEscape && event.key === 'Escape') {
    closeSidebar();
  }
}

function toggleLink(link: SidebarLink, linkIndex: number) {
  if (link.disabled) return;
  props.links.forEach((link, index) => {
    if (index === linkIndex) {
      link.isOpen = !link.isOpen;
    }
  });
}
</script>

<style lang="scss" scoped src="./Sidebar.style.scss"></style>
