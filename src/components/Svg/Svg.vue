<template>
  <span
    ref="icon"
    class="icon"
    v-html="svgEl"
  ></span>
</template>

<script setup lang="ts">
// imports
import { ref, useTemplateRef, watch } from 'vue';
import type { SvgProps } from './Svg';

// interfaces & types

// constants

// composable

// props
const props = withDefaults(defineProps<SvgProps>(), {
  size: '1.5rem',
});
// defineEmits

// states (refs and reactives)
const spanRef = useTemplateRef('icon');
const svgEl = ref<string | null>(null);

// computed

// watchers
watch([() => props.src, () => props.name], loadSvg, { immediate: true });
watch([() => props.size], updateSvg);
// lifecycles

// methods
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
  return svgData?.replace(/<svg\b([^>]*)>/g, (_, attributes) => {
    let updatedAttributes = attributes;

    updatedAttributes = /width\s*=\s*["'][^"']*["']/.test(updatedAttributes)
      ? updatedAttributes.replace(/width\s*=\s*["'][^"']*["']/, `width="${props.size}"`)
      : `${updatedAttributes} width="${props.size}"`;

    updatedAttributes = /height\s*=\s*["'][^"']*["']/.test(updatedAttributes)
      ? updatedAttributes.replace(/height\s*=\s*["'][^"']*["']/, `height="${props.size}"`)
      : `${updatedAttributes} height="${props.size}"`;

    updatedAttributes = /fill\s*=\s*["'][^"']*["']/.test(updatedAttributes)
      ? updatedAttributes.replace(/fill\s*=\s*["'][^"']*["']/, `fill="currentColor"`)
      : `${updatedAttributes} fill="currentColor"`;

    return `<svg${updatedAttributes}>`;
  });
}
</script>
