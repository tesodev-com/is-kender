import { onMounted, ref } from 'vue';

export type Theme = 'light' | 'dark' | 'system';
const currentTheme = ref<Theme>('light');

export function useTheme() {
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      currentTheme.value = savedTheme as 'light' | 'dark';
    } else {
      currentTheme.value = 'system';
    }
    applyTheme(currentTheme.value);
  });

  const applyTheme = (theme: Theme) => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme.value = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme.value);
    } else {
      currentTheme.value = theme;
      document.documentElement.setAttribute('data-theme', currentTheme.value);
    }
    localStorage.setItem('theme', currentTheme.value);
  };

  const toggleTheme = (useSystemTheme = false) => {
    if (currentTheme.value === 'light') {
      currentTheme.value = 'dark';
    } else if (currentTheme.value === 'dark' && useSystemTheme) {
      currentTheme.value = 'system';
    } else {
      currentTheme.value = 'light';
    }
    applyTheme(currentTheme.value);
  };

  return { currentTheme, toggleTheme, applyTheme };
}