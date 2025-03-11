<template>
  <div
    class="swiper-slide"
    :data-index="cKey"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports
import { getCurrentInstance, ref } from 'vue';

// interfaces & types

// constants

// composable
defineOptions({
  name: 'SwiperSlide',
});
const instance = getCurrentInstance();
// props

// defineEmits

// states (refs and reactives)
const cKey = ref(instance ? instance.vnode.key : null);
// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./SwiperSlide.style.scss"></style>
