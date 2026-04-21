'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem(STORAGE_KEY) || 'light'
}

function applyTheme(theme: string) {
  const root = document.documentElement
  const useDark = theme === 'dark'
  root.classList.toggle('dark', Boolean(useDark))
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

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

