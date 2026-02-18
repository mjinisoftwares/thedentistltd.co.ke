'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { themeLocalStorageKey } from './shared'
import type { Theme } from './types'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    // Get saved theme from localStorage
    const saved = localStorage.getItem(themeLocalStorageKey) as Theme | null

    if (saved && (saved === 'light' || saved === 'dark')) {
      applyTheme(saved)
      setThemeState(saved)
      return
    }

    // If no saved theme, check system preference
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = systemDark ? 'dark' : 'light'
    applyTheme(initial)
    setThemeState(initial)
  }, [])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    // Use data-theme attribute instead of classes to match CSS
    root.setAttribute('data-theme', t)
    localStorage.setItem(themeLocalStorageKey, t)
  }

  const setTheme = (t: Theme) => {
    setThemeState(t)
    applyTheme(t)
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
