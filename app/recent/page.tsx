'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, Bookmark, BookmarkCheck, Share2, Info } from "lucide-react"
import { useAppStore } from '@/lib/store'
import { toast } from 'sonner'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { tools, type Tool } from '@/lib/data'

export default function RecentPage() {
  const { 
    viewMode,
    searchQuery, 
    setSearchQuery, 
    favorites, 
    toggleFavorite,
    selectedCategory,
    selectedTags,
    toggleTag,
    addToRecentlyViewed,
    recentlyViewed
  } = useAppStore()

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
    } catch (err) {
      navigator.clipboard.writeText(tool.url)
      toast.success('Link copied to clipboard')
    }
  }

  const handleTagClick = (tag: string) => {
    toggleTag(tag)
  }

  // Get recently viewed tools
  const recentTools = tools
    .filter(tool => recentlyViewed.includes(tool.id))
    .sort((a, b) => {
      const aIndex = recentlyViewed.indexOf(a.id)
      const bIndex = recentlyViewed.indexOf(b.id)
      return aIndex - bIndex
    })

  // Filter based on search and filters
  const filteredTools = recentTools.filter(tool => {
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
            Recently Viewed
          </h1>
          <p className="text-xl text-muted-foreground">
            Your recently accessed tools and services
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto w-full flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recent items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CommandMenu />
        </div>

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
                        onClick={() => toggleFavorite(tool.id)}
                        className={favorites.includes(tool.id) ? "" : "opacity-0 group-hover:opacity-100"}
                      >
                        {favorites.includes(tool.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
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
                        onClick={() => handleTagClick(tag)}
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
            <p className="text-lg text-muted-foreground">
              {searchQuery 
                ? 'No recent items match your search'
                : 'No recently viewed items yet. Start exploring!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
