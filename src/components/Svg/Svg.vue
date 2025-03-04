<template>
  <span
    ref="icon"
    class="icon"
    :style="style"
    v-html="svgEl"
  ></span>
</template>

<script setup lang="ts">
import type { SvgProps } from 'library/Svg';
import { onMounted, onServerPrefetch, ref, useTemplateRef, watch } from 'vue';

if (import.meta.env.SSR) {
  onServerPrefetch(async () => {
    await loadSvg();
  });
} else {
  onMounted(async () => {
    await loadSvg();
  });
}
const props = withDefaults(defineProps<SvgProps>(), {
  size: '1em',
});
const spanRef = useTemplateRef('icon');
const svgEl = ref<string | null>(null);
watch([() => props.src, () => props.name], loadSvg);
watch([() => props.size], updateSvg);
async function loadSvg() {
  try {
    if (props.src) {
      svgEl.value = parseSvg(props.src);
    } else if (props.name) {
      const module = await import(`../../assets/icons/${props.name}.svg?raw`).then(m => m.default);
      svgEl.value = parseSvg(module);
    }
  } catch {
    svgEl.value = null;
  }
}
function updateSvg() {
  if (spanRef.value) {
    const svg = spanRef.value?.querySelector('svg')?.outerHTML;
    if (!svg) return;
    svgEl.value = parseSvg(svg);
  }
}
function parseSvg(svgData: string) {
  svgData = svgData.replace(/\bwidth\s*=\s*["'][^"']*["']/g, '');
  svgData = svgData.replace(/\bheight\s*=\s*["'][^"']*["']/g, '');
  svgData = svgData.replace(/\bfill\s*=\s*["'][^"']*["']/g, '');

  svgData = svgData.replace(/<svg\b([^>]*)>/, (_, attributes) => {
    return `<svg ${attributes} width="${props.size}" height="${props.size}" fill="currentColor">`;
  });

  return svgData;
}
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: max-content;
}
</style>
