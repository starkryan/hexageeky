import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Tool } from './data'

const DEFAULT_LANGUAGE = 'en' as const

interface AppState {
  // UI State
  viewMode: 'grid' | 'list'
  searchQuery: string
  selectedCategory: string | null
  selectedTags: string[]
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'hi'
  
  // Data State
  favorites: string[]
  recentlyViewed: string[]

  // Settings
  settings: {
    theme: 'light' | 'dark' | 'system'
    language: 'en' | 'hi'
    gridView: boolean
    autoplayAnimations: boolean
    showRecentlyViewed: boolean
  }

  // Actions
  setViewMode: (mode: 'grid' | 'list') => void
  setSearchQuery: (query: string) => void
  toggleFavorite: (id: string) => void
  setSelectedCategory: (category: string | null) => void
  setSelectedTags: (tags: string[]) => void
  toggleTag: (tag: string) => void
  addToRecentlyViewed: (tool: Tool) => void
  clearRecentlyViewed: () => void
  updateSettings: (settings: Partial<AppState['settings']>) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLanguage: (lang: 'en' | 'hi') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial UI State
      viewMode: 'grid',
      searchQuery: '',
      selectedCategory: null,
      selectedTags: [],
      theme: 'light',
      language: DEFAULT_LANGUAGE,

      // Initial Data State
      favorites: [],
      recentlyViewed: [],

      // Initial Settings
      settings: {
        theme: 'light',
        language: DEFAULT_LANGUAGE,
        gridView: true,
        autoplayAnimations: true,
        showRecentlyViewed: true,
      },

      // Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [...state.favorites, id],
        })),
      setSelectedCategory: (category) =>
        set({ selectedCategory: category }),
      setSelectedTags: (tags) =>
        set({ selectedTags: tags }),
      toggleTag: (tag) =>
        set((state) => ({
          selectedTags: state.selectedTags.includes(tag)
            ? state.selectedTags.filter(t => t !== tag)
            : [...state.selectedTags, tag]
        })),
      addToRecentlyViewed: (tool) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== tool.id)
          return {
            recentlyViewed: [tool.id, ...filtered].slice(0, 10), // Keep only last 10 items
          }
        }),
      clearRecentlyViewed: () =>
        set({ recentlyViewed: [] }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
      setTheme: (theme) =>
        set({ theme }),
      setLanguage(language) {
        // Ensure we always have a valid language, fallback to English
        const validLanguage = language === 'hi' ? 'hi' : DEFAULT_LANGUAGE
        set({ language: validLanguage })
        set((state) => ({
          settings: { ...state.settings, language: validLanguage }
        }))
      },
    }),
    {
      name: 'hexageeky-storage',
      version: 1,
    }
  )
)
