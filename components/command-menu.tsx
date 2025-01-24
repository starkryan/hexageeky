'use client'

import * as React from 'react'
import {
 
  Grid,
  List,
  SortAsc,
  Clock,
  Star,
  Sun,
  Moon,
  Trash2,
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

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    darkMode,
    toggleDarkMode,
    clearFilters
  } = useAppStore()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => { router.push('/'); setOpen(false) }}>
              <Grid className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => { router.push('/recent'); setOpen(false) }}>
              <Clock className="mr-2 h-4 w-4" />
              <span>Recent</span>
            </CommandItem>
            <CommandItem onSelect={() => { router.push('/popular'); setOpen(false) }}>
              <Star className="mr-2 h-4 w-4" />
              <span>Popular</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="View">
            <CommandItem onSelect={() => setViewMode('grid')}>
              <Grid className="mr-2 h-4 w-4" />
              <span>Grid View</span>
              {viewMode === 'grid' && <span className="ml-auto text-sm">Active</span>}
            </CommandItem>
            <CommandItem onSelect={() => setViewMode('list')}>
              <List className="mr-2 h-4 w-4" />
              <span>List View</span>
              {viewMode === 'list' && <span className="ml-auto text-sm">Active</span>}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Sort">
            <CommandItem onSelect={() => setSortBy('name')}>
              <SortAsc className="mr-2 h-4 w-4" />
              <span>Sort by Name</span>
              {sortBy === 'name' && <span className="ml-auto text-sm">Active</span>}
            </CommandItem>
            <CommandItem onSelect={() => setSortBy('recent')}>
              <Clock className="mr-2 h-4 w-4" />
              <span>Sort by Recent</span>
              {sortBy === 'recent' && <span className="ml-auto text-sm">Active</span>}
            </CommandItem>
            <CommandItem onSelect={() => setSortBy('popular')}>
              <Star className="mr-2 h-4 w-4" />
              <span>Sort by Popular</span>
              {sortBy === 'popular' && <span className="ml-auto text-sm">Active</span>}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => toggleDarkMode()}>
              {darkMode ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </CommandItem>
            <CommandItem onSelect={() => clearFilters()}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Clear Filters</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
