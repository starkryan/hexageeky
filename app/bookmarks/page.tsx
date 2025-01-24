'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAppStore } from "@/lib/store"
import { 
  ExternalLink, 
  BookmarkCheck,
  Search,
  Bookmark,
  Share2,
  Info
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { tools, type Tool } from '@/lib/data'
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BookmarksPage() {
  const { 
    favorites, 
    toggleFavorite,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    addToRecentlyViewed,
    viewMode
  } = useAppStore()
  
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpenTool = (tool: Tool) => {
    addToRecentlyViewed(tool)
    window.open(tool.url, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async (tool: Tool) => {
    try {
      await navigator.share({
        title: tool.title,
        text: tool.description,
        url: tool.url,
      })
    } catch {
      navigator.clipboard.writeText(tool.url)
      toast.success('Link copied to clipboard')
    }
  }

  const handleToggleBookmark = (tool: Tool) => {
    toggleFavorite(tool.id)
    const isBookmarked = favorites.includes(tool.id)
    toast(
      isBookmarked 
        ? `${tool.title} removed from bookmarks`
        : `${tool.title} added to bookmarks`,
      {
        icon: isBookmarked ? '🗑️' : '🔖',
        duration: 2000,
        className: cn(
          "group border",
          isBookmarked 
            ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400" 
            : "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
        ),
      }
    )
  }

  // Get bookmarked tools
  const bookmarkedTools = tools.filter(tool => favorites.includes(tool.id))

  // Get all unique categories from bookmarked tools
  const categories = ['All', ...new Set(bookmarkedTools.map(tool => tool.category))]

  // Get all unique tags from bookmarked tools
  // const allTags = [...new Set(bookmarkedTools.flatMap(tool => tool.tags || []))]

  // Filter based on search and filters
  const filteredTools = bookmarkedTools.filter(tool => {
    const matchesSearch = !searchQuery || 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    
    const matchesTags = selectedTags.length === 0 || 
      (tool.tags && tool.tags.some(tag => selectedTags.includes(tag)))

    return matchesSearch && matchesCategory && matchesTags
  })

  return (
    <div className="p-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Bookmarks
          </h1>
          <p className="text-xl text-muted-foreground">
            Your favorite tools and services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-xl mx-auto w-full flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <ScrollArea className="w-full">
            <div className="flex space-x-2 pb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  className="px-4 py-2 whitespace-nowrap"
                  onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {/* Tools Grid/List */}
        {filteredTools.length > 0 ? (
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
          )}>
            {filteredTools.map((tool) => (
              <Card 
                key={tool.id} 
                className={cn(
                  "group",
                  viewMode === 'list' && "flex flex-row items-center"
                )}
              >
                <CardHeader className={cn(
                  viewMode === 'list' && "flex-1"
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base sm:text-lg line-clamp-1">
                          {tool.title}
                        </CardTitle>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4">
                              <Info className="h-3 w-3" />
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{tool.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {tool.description}
                                </p>
                                {tool.features && (
                                  <ul className="text-sm list-disc pl-4 space-y-1">
                                    {tool.features.map((feature, i) => (
                                      <li key={i}>{feature}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <CardDescription className={cn(
                        "line-clamp-2",
                        viewMode === 'list' && "line-clamp-1"
                      )}>
                        {tool.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShare(tool)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleBookmark(tool)}
                      >
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">
                      {tool.category}
                    </Badge>
                    {tool.tags?.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="outline"
                        className={cn(
                          "cursor-pointer",
                          selectedTags.includes(tag) && "bg-primary/10"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className={cn(
                  viewMode === 'list' && "flex-shrink-0 pr-6"
                )}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Website
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Open {tool.title}</DialogTitle>
                        <DialogDescription>
                          You are about to visit {tool.url}. This will open in a new tab.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => handleShare(tool)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button onClick={() => handleOpenTool(tool)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Continue
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No bookmarks found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery 
                ? 'No bookmarks match your search'
                : 'Start exploring and bookmark your favorite tools!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
