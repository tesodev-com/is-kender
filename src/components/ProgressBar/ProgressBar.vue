<template>
  <div :class="progressBarContainerClasses">
    <div class="progress-bar-background">
      <template v-if="showTooltip || hoverTooltip">
        <div class="progress-bar" :style="calculateProgressBarWidth">
          <span class="progress-bar-tooltip">{{ calculateProgressBarWidth.width }}</span>
        </div>
      </template>
      <template v-else>
        <div class="progress-bar" :style="calculateProgressBarWidth" />
      </template>
    </div>
    <p v-if="showPercentage" class="progress-bar-percentage">
      {{ calculateProgressBarWidth.width }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface IProgressBar {
   showPercentage?: boolean;
   percentageLocation?: 'right' |'bottom';
   showTooltip?: boolean;
   hoverTooltip?: boolean;
   tooltipLocation?: 'top' | 'bottom';
   maxValue?: number;
   value: number;
}

const props = withDefaults(defineProps<IProgressBar>(), {
  showPercentage: false,
  percentageLocation: 'right',
  showTooltip: false,
  hoverTooltip: false,
  tooltipLocation: 'top',
  maxValue: 100,
  value: 0
});

const progressBarContainerClasses = computed(() => {
  return [
    'progress-bar-container',
    { [`progress-bar-${props.percentageLocation}`]: props.showPercentage },
    { [`progress-bar-tooltip-${props.tooltipLocation}`]: props.showTooltip || props.hoverTooltip },
    { 'progress-bar-tooltip-hover': props.hoverTooltip },
  ];
});

const calculateProgressBarWidth = computed(() => {
  const width = (props.value * props.maxValue) / 100;
  return {
    width: width + '%',
  };
});

</script>

<style lang="scss" scoped src="./ProgressBar.style.scss"></style>