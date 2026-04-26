'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function applyTheme(theme: string) {
  const root = document.documentElement
  const useDark = theme === 'dark'
  root.classList.toggle('dark', Boolean(useDark))
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const initial =
      saved === 'dark' || saved === 'light'
        ? saved
        : document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light'
    setTheme(initial)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [mounted, theme])

  if (!mounted) {
    return (
      <button
        type="button"
        className="text-sm sm:text-base md:text-xl font-bold opacity-0 pointer-events-none"
        aria-label="Toggle theme"
      >
        Theme
      </button>
    )
  }

  return (
    <button
      type="button"
      className="text-sm sm:text-base md:text-xl font-bold hover:underline hover:decoration-4 hover:decoration-pink-100"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
      title={`Theme: ${theme}`}
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}

