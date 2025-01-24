import { tools } from '@/lib/data'
import { NextResponse } from 'next/server'

const ITEMS_PER_PAGE = 12

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const query = searchParams.get('query')?.toLowerCase() || ''
  const category = searchParams.get('category') || ''

  let filteredTools = [...tools]

  // Apply filters
  if (query) {
    filteredTools = filteredTools.filter(
      tool =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (category) {
    filteredTools = filteredTools.filter(
      tool => tool.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Calculate pagination
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const paginatedTools = filteredTools.slice(start, end)
  const hasMore = end < filteredTools.length

  return NextResponse.json({
    tools: paginatedTools,
    hasMore,
    total: filteredTools.length
  })
}
