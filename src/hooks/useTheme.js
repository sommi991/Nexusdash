import { useState, useEffect } from 'react'
import { useNexusStore } from './useNexusStore'

export const useTheme = () => {
  const { theme, setTheme } = useNexusStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
