'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner'
import { Sidebar } from "@/components/sidebar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="relative flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden px-4 py-6 lg:px-8 ml-[300px]">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  )
}
