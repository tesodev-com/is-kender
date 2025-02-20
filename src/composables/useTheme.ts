import { onMounted, ref } from 'vue';

export type Theme = 'light' | 'dark' | 'system';
const currentTheme = ref<Theme>('system');

export function useTheme() {
  const applyTheme = (theme: Theme) => {
    let appliedTheme = theme;
    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', appliedTheme);
    localStorage.setItem('theme', theme);
  };

  onMounted(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    currentTheme.value = savedTheme;
    applyTheme(currentTheme.value);
  });

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'system'];
    currentTheme.value = themeOrder[(themeOrder.indexOf(currentTheme.value) + 1) % themeOrder.length];
    applyTheme(currentTheme.value);
  };

  return { currentTheme, toggleTheme, applyTheme };
}