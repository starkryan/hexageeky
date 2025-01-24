'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner'
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore()

  return (
    <ThemeProvider>
      <div className="relative flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar className={cn(
            "fixed left-0 top-0 z-40 h-screen w-[300px] border-r border-border/40 bg-background",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )} />
          <main className={cn(
            "flex-1 overflow-x-hidden px-4 py-6 lg:px-8 transition-all duration-300",
            sidebarOpen ? "ml-[300px]" : "ml-0"
          )}>
            {children}
          </main>
        </div>
      </div>
      <CommandMenu />
      <KeyboardShortcuts />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  )
}
