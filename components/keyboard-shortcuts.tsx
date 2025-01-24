'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function KeyboardShortcuts() {
  const { setSidebarOpen, setSelectedCategory } = useAppStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) searchInput.focus()
      }

      // Command/Ctrl + / to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }

      // Escape to clear category filter
      if (e.key === 'Escape') {
        setSelectedCategory(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSidebarOpen, setSelectedCategory])

  return null
}
