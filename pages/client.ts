import { DEFAULT_THEME_PREFERENCE, getDataTheme, THEME_STORAGE_KEY } from '@/lib/theme'

const storageKey = THEME_STORAGE_KEY
const themes = {
  light: getDataTheme('light'),
  dark: getDataTheme('dark'),
}

try {
  const storedThemePreference = window.localStorage.getItem(storageKey)
  const themePreference =
    storedThemePreference === 'light' || storedThemePreference === 'dark'
      ? storedThemePreference
      : DEFAULT_THEME_PREFERENCE

  document.documentElement.setAttribute('data-theme', themes[themePreference])
} catch {
  document.documentElement.setAttribute('data-theme', themes[DEFAULT_THEME_PREFERENCE])
}