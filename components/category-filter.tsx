'use client'

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const { selectedCategory, setSelectedCategory } = useAppStore()

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-4">
        <Button
          variant={selectedCategory === null ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="flex-shrink-0"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="flex-shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
