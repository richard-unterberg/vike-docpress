import { searchIndexUrls } from 'virtual:search-index-manifest'
import type { DocHeading } from '@/lib/docs/headings'
import type { Locale } from '@/lib/i18n/config'
import type { SearchIndexEntry, SearchResult } from '@/lib/search/shared'

const normalizeSearchValue = (value: string) => value.toLocaleLowerCase().replace(/\s+/g, ' ').trim()

const getQueryTerms = (query: string) => {
  const normalizedQuery = normalizeSearchValue(query)
  if (!normalizedQuery) return []

  const parts = normalizedQuery.split(' ').filter(Boolean)
  return parts.length > 0 ? parts : [normalizedQuery]
}

const getHeadingMatch = (entry: SearchIndexEntry, normalizedQuery: string, queryTerms: string[]) => {
  let bestHeading: DocHeading | null = null
  let bestScore = 0

  for (const heading of entry.headings) {
    const normalizedHeading = normalizeSearchValue(heading.title)
    let score = 0

    if (normalizedHeading.includes(normalizedQuery)) score += 12
    for (const term of queryTerms) {
      if (normalizedHeading.includes(term)) score += 6
    }

    if (score > bestScore) {
      bestScore = score
      bestHeading = heading
    }
  }

  return {
    heading: bestHeading,
    score: bestScore,
  }
}

const createExcerpt = (text: string, query: string) => {
  const normalizedText = text.replace(/\s+/g, ' ').trim()
  if (!normalizedText) return ''

  const trimmedQuery = query.trim()
  const maxLength = 160

  if (!trimmedQuery) {
    return normalizedText.length > maxLength ? `${normalizedText.slice(0, maxLength - 3).trimEnd()}...` : normalizedText
  }

  const lowerText = normalizedText.toLocaleLowerCase()
  const lowerQuery = trimmedQuery.toLocaleLowerCase()
  const matchIndex = lowerText.indexOf(lowerQuery)

  if (matchIndex < 0) {
    return normalizedText.length > maxLength ? `${normalizedText.slice(0, maxLength - 3).trimEnd()}...` : normalizedText
  }

  const start = Math.max(0, matchIndex - 48)
  const end = Math.min(normalizedText.length, matchIndex + lowerQuery.length + 96)
  const excerpt = normalizedText.slice(start, end).trim()

  return `${start > 0 ? '...' : ''}${excerpt}${end < normalizedText.length ? '...' : ''}`
}

export const searchDocs = (entries: SearchIndexEntry[], query: string, limit = 8): SearchResult[] => {
  const normalizedQuery = normalizeSearchValue(query)
  const queryTerms = getQueryTerms(query)
  if (!normalizedQuery || queryTerms.length === 0) return []

  return entries
    .map((entry) => {
      const normalizedTitle = normalizeSearchValue(entry.title)
      const normalizedSlug = normalizeSearchValue(entry.slug)
      const normalizedText = normalizeSearchValue(entry.text)
      const headingMatch = getHeadingMatch(entry, normalizedQuery, queryTerms)
      let score = 0

      if (normalizedTitle.includes(normalizedQuery)) score += 30
      if (normalizedSlug.includes(normalizedQuery)) score += 16
      if (normalizedText.includes(normalizedQuery)) score += 8

      for (const term of queryTerms) {
        if (normalizedTitle.includes(term)) score += 12
        if (normalizedSlug.includes(term)) score += 6
        if (normalizedText.includes(term)) score += 3
      }

      score += headingMatch.score

      if (score === 0) {
        return null
      }

      const href = headingMatch.heading ? `${entry.href}#${headingMatch.heading.id}` : entry.href

      return {
        excerpt: createExcerpt(entry.text, query),
        href,
        score,
        sectionTitle: headingMatch.heading?.title ?? null,
        title: entry.title,
      }
    })
    .filter((value): value is SearchResult & { score: number } => value !== null)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit)
    .map(({ score: _score, ...result }) => result)
}

export const loadSearchIndex = async (locale: Locale): Promise<SearchIndexEntry[]> => {
  const response = await fetch(searchIndexUrls[locale])

  if (!response.ok) {
    throw new Error(`Failed to load search index for locale "${locale}".`)
  }

  return (await response.json()) as SearchIndexEntry[]
}
