'use client'

import * as React from 'react'
import {
  Grid,
  List,
  Clock,
  Star,
  Sun,
  Moon,
  Trash2,
  Home,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

type ViewMode = 'grid' | 'list'

interface NavigationItem {
  label: string
  path: string
  icon: React.ReactNode
  shortcut?: string
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', path: '/', icon: <Home className="mr-2 h-4 w-4" />, shortcut: '⌘H' },
  { label: 'Recent', path: '/recent', icon: <Clock className="mr-2 h-4 w-4" />, shortcut: '⌘R' },
  { label: 'Bookmarks', path: '/bookmarks', icon: <Star className="mr-2 h-4 w-4" />, shortcut: '⌘P' },
]

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const {
    viewMode,
    setViewMode,
    theme,
    setTheme,
    setSelectedCategory,
    setSelectedTags,
  } = useAppStore()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    setOpen(false)
  }

  const handleClearFilters = () => {
    setSelectedCategory(null)
    setSelectedTags([])
    setOpen(false)
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setOpen(false)
  }

  const isDarkMode = theme === 'dark'

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        aria-label="Command menu search"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.path}
              onSelect={() => {
                router.push(item.path)
                setOpen(false)
              }}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.shortcut && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  {item.shortcut}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        
        <CommandGroup heading="View">
          <CommandItem onSelect={() => handleViewModeChange('grid')}>
            <Grid className="mr-2 h-4 w-4" />
            <span>Grid View</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘G
            </kbd>
            {viewMode === 'grid' && (
              <span className="ml-2 text-sm text-primary">Active</span>
            )}
          </CommandItem>
          <CommandItem onSelect={() => handleViewModeChange('list')}>
            <List className="mr-2 h-4 w-4" />
            <span>List View</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘L
            </kbd>
            {viewMode === 'list' && (
              <span className="ml-2 text-sm text-primary">Active</span>
            )}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onSelect={handleThemeToggle}>
            {isDarkMode ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light Mode</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  ⌘T
                </kbd>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark Mode</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  ⌘T
                </kbd>
              </>
            )}
          </CommandItem>
          <CommandItem onSelect={handleClearFilters}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Clear Filters</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘⌫
            </kbd>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
