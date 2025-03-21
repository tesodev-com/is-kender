<template>
  <Svg
    :src="loadingIcon"
    class="animate-spin"
    :size="iconSize"
    :style="`color:${color}`"
  ></Svg>
</template>

<script setup lang="ts">
// imports
import { loadingIcon } from '@/assets/icons';
import Svg from 'library-components/Svg';
import { computed } from 'vue';
import type { SpinnerProps } from './types';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<SpinnerProps>(), {
  size: '1em',
  fluid: false,
});
// defineEmits

// states (refs and reactives)

// computed
const iconSize = computed(() => (props.fluid ? '100%' : props.size));
// watchers

// lifecycles

// methods
</script>
