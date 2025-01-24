import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Tool } from './data'

const DEFAULT_LANGUAGE = 'en' as const
const DEFAULT_THEME = 'system' as const

interface AppState {
  // UI State
  viewMode: 'grid' | 'list'
  searchQuery: string
  selectedCategory: string | null
  selectedTags: string[]
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'hi'
  sidebarOpen: boolean
  
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
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial UI State
      viewMode: 'grid',
      searchQuery: '',
      selectedCategory: null,
      selectedTags: [],
      theme: DEFAULT_THEME,
      language: DEFAULT_LANGUAGE,
      sidebarOpen: true,

      // Initial Data State
      favorites: [],
      recentlyViewed: [],

      // Initial Settings
      settings: {
        theme: DEFAULT_THEME,
        language: DEFAULT_LANGUAGE,
        gridView: true,
        autoplayAnimations: true,
        showRecentlyViewed: true,
      },

      // Actions
      setViewMode: (mode) => 
        set((state) => ({
          viewMode: mode,
          settings: { ...state.settings, gridView: mode === 'grid' }
        })),

      setSearchQuery: (query) => 
        set({ searchQuery: query }),

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
        set((state) => {
          const settings = { ...state.settings, ...newSettings }
          return {
            settings,
            theme: settings.theme,
            language: settings.language,
            viewMode: settings.gridView ? 'grid' : 'list'
          }
        }),

      setTheme: (theme) =>
        set((state) => ({
          theme,
          settings: { ...state.settings, theme }
        })),

      setLanguage: (language) => {
        const validLanguage = language === 'hi' ? 'hi' : DEFAULT_LANGUAGE
        set((state) => ({
          language: validLanguage,
          settings: { ...state.settings, language: validLanguage }
        }))
      },

      setSidebarOpen: (open) => 
        set((state) => ({ 
          sidebarOpen: typeof open === 'function' ? open(state.sidebarOpen) : open 
        })),
    }),
    {
      name: 'hexageeky-storage',
      version: 1,
    }
  )
)
