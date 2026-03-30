import type { ComponentType } from 'react'
import type { DocConfig } from '@/lib/docs/config'
import type { DocHeading } from '@/lib/docs/headings'
import type { TelefuncSystemConfig } from '@/lib/docs/systemConfig'
import { DEFAULT_LOCALE, resolveLocale, type Locale } from '@/lib/i18n/config'
import { getDocHeadings, resolveDocShell } from './contentManifest'

export type DocPageData = {
  config: DocConfig
  docSlug: string
  headings: DocHeading[]
  resolvedLocale: Locale
}

export type GeneratedDocModule = {
  default: ComponentType
  docConfig?: DocConfig
}

type GeneratedDocModules = Partial<Record<Locale, GeneratedDocModule>>

export const getGeneratedDocPageData = (
  slug: string,
  locale: Locale | string | undefined,
  modules: GeneratedDocModules,
  telefuncConfig?: TelefuncSystemConfig,
): DocPageData => {
  const requestedLocale = resolveLocale(locale)
  const shell = resolveDocShell(slug, requestedLocale, telefuncConfig)
  if (!shell) {
    throw new Error(`Missing generated doc shell for "${slug}" and locale "${requestedLocale}".`)
  }

  return {
    config: {
      ...shell.config,
      ...(modules[DEFAULT_LOCALE]?.docConfig ?? {}),
      ...(modules[shell.resolvedLocale]?.docConfig ?? {}),
    },
    docSlug: slug,
    headings: getDocHeadings(slug, shell.resolvedLocale),
    resolvedLocale: shell.resolvedLocale,
  }
}
