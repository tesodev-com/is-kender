<template>
  <div
    v-if="link.children && link.children.length > 0"
    class="sidebar-nav-collapse"
  >
    <div
      class="sidebar-nav-link"
      :class="[{ 'sidebar-nav-link-disabled': link.disabled }]"
      @click="emit('toggle', link, index)"
    >
      <div
        v-if="link.slotKey"
        class="sidebar-nav-link-content"
      >
        <slot
          :name="link.slotKey"
          v-bind="link"
        >
          <Svg
            v-if="link.iconSrc"
            :src="link.iconSrc"
            size="20"
          />
          {{ link.text }}
        </slot>
      </div>
      <div
        v-else
        class="sidebar-nav-link-content"
      >
        <Svg
          v-if="link.iconSrc"
          :src="link.iconSrc"
          size="20"
        />
        {{ link.text }}
      </div>
      <div
        class="sidebar-nav-link-icon"
        :class="{ 'sidebar-nav-link-icon-open': link.isOpen }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="link.isOpen"
        class="sidebar-nav-list"
      >
        <Link
          v-for="child in link.children"
          :key="child.href"
          :to="link.href"
          :disabled="link.disabled"
          class="sidebar-nav-link"
          :class="[{ 'sidebar-nav-link-disabled': link.disabled || child.disabled, 'sidebar-nav-link-padding': link.iconSrc && !child.iconSrc }]"
        >
          <div
            v-if="child.slotKey"
            class="sidebar-nav-link-content"
          >
            <slot
              :name="child.slotKey"
              v-bind="child"
            >
              <Svg
                v-if="child.iconSrc"
                :src="child.iconSrc"
                size="20"
              />
              {{ child.text }}
            </slot>
          </div>
          <div
            v-else
            class="sidebar-nav-link-content"
          >
            <Svg
              v-if="child.iconSrc"
              :src="child.iconSrc"
              size="20"
            />
            {{ child.text }}
          </div>
        </Link>
      </div>
    </transition>
  </div>
  <Link
    v-else
    :useRouter="useRouter"
    :to="link.href"
    :disabled="link.disabled"
    class="sidebar-nav-link"
    :class="[{ 'sidebar-nav-link-disabled': link.disabled }]"
  >
    <div
      v-if="link.slotKey"
      class="sidebar-nav-link-content"
    >
      <slot
        :name="link.slotKey"
        v-bind="link"
      >
        <Svg
          v-if="link.iconSrc"
          :src="link.iconSrc"
          size="20"
        />
        {{ link.text }}
      </slot>
    </div>
    <div
      v-else
      class="sidebar-nav-link-content"
    >
      <Svg
        v-if="link.iconSrc"
        :src="link.iconSrc"
        size="20"
      />
      {{ link.text }}
    </div>
  </Link>
</template>

<script setup lang="ts">
import Svg from 'library/Svg';
import Link from 'library/Link';
import type { SidebarLink, SidebarItemEmits } from 'library/Sidebar';

defineProps<{
  link: SidebarLink;
  index: number;
  useRouter?: boolean;
}>();

const emit = defineEmits<SidebarItemEmits>();
</script>

<style lang="scss" scoped src="./SidebarItem.style.scss"></style>
