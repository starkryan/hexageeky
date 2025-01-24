'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export function KeyboardShortcuts() {
  const {
    setSidebarOpen,
    setSelectedCategory,
    setSelectedTags,
    setViewMode,
    setTheme,
    theme,
  } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const isMetaKey = e.metaKey || e.ctrlKey

      // Command/Ctrl + B to toggle sidebar
      if (isMetaKey && e.key === 'b') {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }

      // Command/Ctrl + H for Home
      if (isMetaKey && e.key === 'h') {
        e.preventDefault()
        router.push('/')
      }

      // Command/Ctrl + R for Recent
      if (isMetaKey && e.key === 'r') {
        e.preventDefault()
        router.push('/recent')
      }

      // Command/Ctrl + P for Bookmarks
      if (isMetaKey && e.key === 'p') {
        e.preventDefault()
        router.push('/bookmarks')
      }

      // Command/Ctrl + G for Grid View
      if (isMetaKey && e.key === 'g') {
        e.preventDefault()
        setViewMode('grid')
      }

      // Command/Ctrl + L for List View
      if (isMetaKey && e.key === 'l') {
        e.preventDefault()
        setViewMode('list')
      }

      // Command/Ctrl + T for Theme Toggle
      if (isMetaKey && e.key === 't') {
        e.preventDefault()
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }

      // Command/Ctrl + Backspace to clear filters
      if (isMetaKey && e.key === 'Backspace') {
        e.preventDefault()
        setSelectedCategory(null)
        setSelectedTags([])
      }

      // Escape to clear category filter
      if (e.key === 'Escape') {
        setSelectedCategory(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSidebarOpen, setSelectedCategory, setSelectedTags, setViewMode, setTheme, theme, router])

  return null
}
