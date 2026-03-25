import type { Locale } from '@/lib/i18n/config'
import type { DocsSystemConfig } from '@/lib/docs/systemConfig'
import { DEFAULT_LOCALE, resolveLocale } from '@/lib/i18n/config'
import { getDocPath } from '@/lib/docs/systemConfig'
import { localizeHref, stripLocaleFromPathname } from '@/lib/i18n/routing'

type HeadingDefinition = {
  docPath: string
  title: Record<Locale, string>
}

export const headingDefinitions = {
  docsHome: {
    docPath: '',
    title: {
      en: 'Docs',
      zh: '文档',
    },
  },
  getStarted: {
    docPath: 'get-started',
    title: {
      en: 'Welcome',
      zh: '欢迎',
    },
  },
  overview: {
    docPath: 'components/overview',
    title: {
      en: 'Overview',
      zh: '概览',
    },
  },
  components: {
    docPath: 'components/overview',
    title: {
      en: 'Components',
      zh: '组件',
    },
  },
  guides: {
    docPath: 'guides/overview',
    title: {
      en: 'Guides',
      zh: '指南',
    },
  },
} as const satisfies Record<string, HeadingDefinition>

export type HeadingKey = keyof typeof headingDefinitions

export const getHeadingTitle = (headingKey: HeadingKey, locale: Locale | string | undefined = DEFAULT_LOCALE) => {
  return headingDefinitions[headingKey].title[resolveLocale(locale)]
}

export const getHeadingLink = (headingKey: HeadingKey, docsConfig?: DocsSystemConfig) => {
  return getDocPath(headingDefinitions[headingKey].docPath, docsConfig)
}

export const getHeadingData = (
  headingKey: HeadingKey,
  locale: Locale | string | undefined = DEFAULT_LOCALE,
  docsConfig?: DocsSystemConfig,
) => {
  return {
    title: getHeadingTitle(headingKey, locale),
    href: localizeHref(getHeadingLink(headingKey, docsConfig), locale),
  }
}

export const getHeadingTitleFromHref = (
  href: string,
  locale: Locale | string | undefined = DEFAULT_LOCALE,
  docsConfig?: DocsSystemConfig,
) => {
  const pathname = stripLocaleFromPathname(href.split('#')[0]?.split('?')[0] ?? href).pathname
  const match = Object.entries(headingDefinitions).find(
    ([headingKey]) => getHeadingLink(headingKey as HeadingKey, docsConfig) === pathname,
  )
  if (!match) return null

  const [headingKey] = match
  return getHeadingTitle(headingKey as HeadingKey, locale)
}
