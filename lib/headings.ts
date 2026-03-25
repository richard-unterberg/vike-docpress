import type { Locale } from '@/lib/i18n/config'
import { DEFAULT_LOCALE, resolveLocale } from '@/lib/i18n/config'
import { localizeHref, stripLocaleFromPathname } from '@/lib/i18n/routing'

const mainMenuHeadingTitles = {
  getStarted: {
    en: 'Welcome',
    de: 'Willkommen',
    zh: '欢迎',
  },
  overview: {
    en: 'Overview',
    de: 'Überblick',
    zh: '概览',
  },
} as const

const baseHeadingLinks = {
  getStarted: '/docs/get-started',
  overview: '/docs/components/overview',
} as const

const subMenuHeadingTitles = {
  anotherPage: {
    en: 'Another Page',
    de: 'Eine andere Seite',
    zh: '另一页',
  },
} as const

const subMenuHeadingLinks = {
  anotherPage: '/docs/another-page',
} as const

export const headingTitles = {
  ...mainMenuHeadingTitles,
  ...subMenuHeadingTitles,
} as const

const headingLinks: Record<HeadingKey, string> = {
  ...baseHeadingLinks,
  ...subMenuHeadingLinks,
}

export type HeadingKey = keyof typeof headingTitles

export const getHeadingTitle = (headingKey: HeadingKey, locale: Locale | string | undefined = DEFAULT_LOCALE) => {
  return headingTitles[headingKey][resolveLocale(locale)]
}

export const getHeadingData = (headingKey: HeadingKey, locale: Locale | string | undefined = DEFAULT_LOCALE) => {
  return {
    title: getHeadingTitle(headingKey, locale),
    href: localizeHref(headingLinks[headingKey], locale),
  }
}

export const getHeadingTitleFromHref = (href: string, locale: Locale | string | undefined = DEFAULT_LOCALE) => {
  const pathname = stripLocaleFromPathname(href.split('#')[0]?.split('?')[0] ?? href).pathname
  const match = Object.entries(headingLinks).find(([, headingHref]) => headingHref === pathname)
  if (!match) return null

  const [headingKey] = match
  return getHeadingTitle(headingKey as HeadingKey, locale)
}
