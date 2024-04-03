import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme',() => {
  const theme = ref('light');

  const setDark = () => {
    theme.value = 'dark';
  }

  const setLight = () => {
    theme.value = 'light';
  }

  const switchTheme = () => {
    theme.value === 'light'? setDark() : setLight()
  }

  const getTheme = computed(() => theme.value)

  const isDarkTheme = computed(() => theme.value === 'dark');

  return {
    theme, setDark, setLight, getTheme, switchTheme, isDarkTheme
  }

})