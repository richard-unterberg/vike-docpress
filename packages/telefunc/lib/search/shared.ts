import type { DocHeading } from '../docs/headings'
import type { Locale } from '../i18n/config'

export type SearchIndexEntry = {
  headings: DocHeading[]
  href: string
  locale: Locale
  resolvedLocale: Locale
  slug: string
  text: string
  title: string
}

export type SearchResult = {
  excerpt: string
  href: string
  sectionTitle: string | null
  title: string
}
