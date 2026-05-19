import { useEffect, useState } from 'react'
import { THEME_STORAGE_KEY } from './consts'

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark') {
    return true
  }
  if (stored === 'light') {
    return false
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeMode = () => {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const mode = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((current) => !current)
  }

  return { isDark, toggleTheme }
}
