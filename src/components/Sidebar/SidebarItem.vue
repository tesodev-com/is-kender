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
        <component
          :is="useRouter ? 'router-link' : 'a'"
          v-for="child in link.children"
          :key="child.href"
          :to="!child.disabled ? child.href : undefined"
          :href="!useRouter && !child.disabled ? child.href : undefined"
          class="sidebar-nav-link"
          :class="[{ 'sidebar-nav-link-disabled': link.disabled || child.disabled, 'sidebar-nav-link-padding': link.iconSrc && !child.iconSrc }]"
        >
          <slot
            v-if="child.slotKey"
            :name="child.slotKey"
            v-bind="child"
          >
            <div class="sidebar-nav-link-content">
              <Svg
                v-if="child.iconSrc"
                :src="child.iconSrc"
                size="20"
              />
              {{ child.text }}
            </div>
          </slot>
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
        </component>
      </div>
    </transition>
  </div>
  <component
    :is="useRouter ? 'router-link' : 'a'"
    v-else
    :to="!link.disabled ? link.href : undefined"
    :href="!useRouter && !link.disabled ? link.href : undefined"
    class="sidebar-nav-link"
    :class="[{ 'sidebar-nav-link-disabled': link.disabled }]"
  >
    <slot
      v-if="link.slotKey"
      :name="link.slotKey"
      v-bind="link"
    >
      <div class="sidebar-nav-link-content">
        <Svg
          v-if="link.iconSrc"
          :src="link.iconSrc"
          size="20"
        />
        {{ link.text }}
      </div>
    </slot>
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
  </component>
</template>

<script setup lang="ts">
import Svg from 'library/Svg';
import type { SidebarLink, SidebarItemEmits } from 'library/Sidebar';

defineProps<{
  link: SidebarLink;
  index: number;
  useRouter?: boolean;
}>();

const emit = defineEmits<SidebarItemEmits>();
</script>

<style lang="scss" scoped src="./SidebarItem.style.scss"></style>
