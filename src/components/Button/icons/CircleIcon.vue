<template>
   <svg :width="props.width" :height="props.height" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M7.00004 12.3333C9.94556 12.3333 12.3334 9.9455 12.3334 6.99998C12.3334 4.05446 9.94556 1.66665 7.00004 1.66665C4.05452 1.66665 1.66671 4.05446 1.66671 6.99998C1.66671 9.9455 4.05452 12.3333 7.00004 12.3333ZM7.00004 13.6666C10.6819 13.6666 13.6667 10.6819 13.6667 6.99998C13.6667 3.31808 10.6819 0.333313 7.00004 0.333313C3.31814 0.333313 0.333374 3.31808 0.333374 6.99998C0.333374 10.6819 3.31814 13.6666 7.00004 13.6666Z"
         fill="currentColor" />
   </svg>
</template>

<script lang="ts" setup >
const props = defineProps({
   width: {
      type: String,
      default: '15',
   },
   height: {
      type: String,
      default: '15',
   },
});
</script>