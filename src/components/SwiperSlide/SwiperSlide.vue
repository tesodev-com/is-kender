<template>
  <div
    class="swiper-slide"
    :data-index="slideIndex"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// imports

// interfaces & types
interface SwiperSlideProps {
  slideIndex: number;
}
// constants

// composable
defineOptions({
  name: 'SwiperSlide',
});
// props
defineProps<SwiperSlideProps>();
// defineEmits

// states (refs and reactives)

// computed

// watchers

// lifecycles

// methods
</script>

<style lang="scss" scoped src="./SwiperSlide.style.scss"></style>
