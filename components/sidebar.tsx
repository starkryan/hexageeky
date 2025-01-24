'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppStore } from '@/lib/store'
import { 
  Grid, 
  Clock, 
  Sun, 
  Moon, 
  Bookmark, 
  Settings, 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  MonitorSmartphone
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useAppStore()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navigation = [
    { href: '/', icon: Grid, label: 'Home' },
    { href: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { href: '/recent', icon: Clock, label: 'Recent' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  const socialLinks = [
    { href: 'https://github.com/hexageeky', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com/hexageeky', icon: Twitter, label: 'Twitter' },
    { href: 'https://linkedin.com/in/hexageeky', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:hello@hexageeky.com', icon: Mail, label: 'Email' },
  ]

  return (
    <div className="fixed top-0 left-0 h-screen w-[300px] border-r bg-background">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">HexaGeeky</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Your Tech Toolbox</p>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          <div className={cn('space-y-4', className)}>
            {/* Navigation */}
            <div className="space-y-1">
              {navigation.map(({ href, icon: Icon, label }) => (
                <Button
                  key={href}
                  asChild
                  variant={pathname === href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <Link href={href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 space-y-4">
          <Separator />
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
              </>
            )}
          </Button>

          {/* Social Links */}
          <div className="flex justify-center gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Button
                key={href}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:text-primary"
                asChild
              >
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
