'use client'

import { Button } from "@/components/ui/button"
import { useAppStore } from '@/lib/store'
import { Sun, Moon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Eye, Keyboard } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SettingsPage() {
  const { theme, setTheme } = useAppStore()

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Settings
          </h1>

          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Sun className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="theme" className="sm:text-base">Theme</Label>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="animations" />
                  <Label htmlFor="animations" className="sm:text-base">Enable animations</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="new-tools" defaultChecked />
                  <Label htmlFor="new-tools" className="sm:text-base">New tools alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="updates" defaultChecked />
                  <Label htmlFor="updates" className="sm:text-base">Tool updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="newsletter" />
                  <Label htmlFor="newsletter" className="sm:text-base">Weekly newsletter</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Keyboard className="h-5 w-5" />
                  Keyboard Shortcuts
                </CardTitle>
                <CardDescription>
                  Customize keyboard shortcuts for quick access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="sm:text-base">Search</Label>
                    <div className="flex items-center gap-1 text-sm">
                      <kbd className="px-2 py-1 bg-muted rounded">⌘</kbd>
                      <kbd className="px-2 py-1 bg-muted rounded">K</kbd>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="sm:text-base">Toggle Sidebar</Label>
                    <div className="flex items-center gap-1 text-sm">
                      <kbd className="px-2 py-1 bg-muted rounded">⌘</kbd>
                      <kbd className="px-2 py-1 bg-muted rounded">/</kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Eye className="h-5 w-5" />
                  Accessibility
                </CardTitle>
                <CardDescription>
                  Customize accessibility settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="reduce-motion" />
                  <Label htmlFor="reduce-motion" className="sm:text-base">Reduce motion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="high-contrast" />
                  <Label htmlFor="high-contrast" className="sm:text-base">High contrast</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
