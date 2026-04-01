import { docsContentEntries } from 'virtual:docs-content-manifest'
import type { DocConfig } from '@/lib/docs/config'
import type { DocHeading } from '@/lib/docs/headings'
import {
  getDocPath,
  getDocsIndexPath,
  resolveTelefuncSystemConfig,
  type TelefuncSystemConfig,
  telefuncSystemConfig,
} from '@/lib/docs/systemConfig'
import { DEFAULT_LOCALE, isLocale, type Locale, locales } from '@/lib/i18n/config'
import { localizePathname } from '@/lib/i18n/routing'

type DocConfigModule = {
  default?: DocConfig
}

type PagePathInfo = {
  segments: string[]
  filename: string
}

type DocEntry = Partial<Record<Locale, { headings: DocHeading[] }>>

const docConfigModules = import.meta.glob<DocConfigModule>('../../pages/**/content.config.{ts,js}', {
  eager: true,
})

const getLogicalSegments = (segments: string[]) => {
  return segments.filter((segment) => segment !== '' && !(segment.startsWith('(') && segment.endsWith(')')))
}

const getPagePathInfo = (path: string): PagePathInfo | null => {
  const match = path.match(/\/pages\/(.+)$/)
  if (!match) return null

  const parts = match[1].split('/').filter(Boolean)
  const filename = parts.at(-1)
  if (!filename) return null

  return {
    segments: parts.slice(0, -1),
    filename,
  }
}

const getDocSlugFromSegments = (segments: string[]) => {
  const contentIndex = segments.indexOf('(content)')
  if (contentIndex < 0) return null

  return getLogicalSegments(segments.slice(contentIndex + 1)).join('/')
}

const getDocsRootSegments = () => {
  const docModulePath = docsContentEntries[0]?.path
  const pathInfo = docModulePath ? getPagePathInfo(docModulePath) : null
  if (!pathInfo) return []

  const contentIndex = pathInfo.segments.indexOf('(content)')
  if (contentIndex < 0) return []

  return pathInfo.segments.slice(0, contentIndex)
}

const docsRootSegments = getDocsRootSegments()

const getDocConfigRouteId = (path: string) => {
  const pathInfo = getPagePathInfo(path)
  if (!pathInfo || !/^content\.config\.[^.]+$/.test(pathInfo.filename)) return null

  const contentRouteId = getDocSlugFromSegments(pathInfo.segments)
  if (contentRouteId !== null) return contentRouteId

  if (docsRootSegments.length === 0) return null

  const isWithinDocsRoot = docsRootSegments.every((segment, index) => pathInfo.segments[index] === segment)
  if (!isWithinDocsRoot) return null

  return getLogicalSegments(pathInfo.segments.slice(docsRootSegments.length)).join('/')
}

const getRouteLineage = (routeId: string) => {
  const segments = routeId.split('/').filter(Boolean)
  const lineage = ['']

  for (let index = 0; index < segments.length; index += 1) {
    lineage.push(segments.slice(0, index + 1).join('/'))
  }

  return lineage
}

const docs = {} as Record<string, DocEntry>
const sharedDocConfigs = new Map<string, DocConfig>()

for (const entry of docsContentEntries) {
  if (!isLocale(entry.locale)) continue

  docs[entry.routeId] ??= {}
  docs[entry.routeId][entry.locale] = {
    headings: entry.headings,
  }
}

for (const [path, mod] of Object.entries(docConfigModules)) {
  const routeId = getDocConfigRouteId(path)
  if (routeId === null) continue

  if (sharedDocConfigs.has(routeId)) {
    throw new Error(
      `Duplicate content.config for logical route "${routeId || '/'}". Keep only one config file for that docs path.`,
    )
  }

  sharedDocConfigs.set(routeId, mod.default ?? {})
}

const getSharedDocConfig = (routeId: string) => {
  return getRouteLineage(routeId).reduce<DocConfig>((config, prefix) => {
    return {
      ...config,
      ...(sharedDocConfigs.get(prefix) ?? {}),
    }
  }, {})
}

const getAllDocSlugs = () => {
  return Object.keys(docs).sort((left, right) => left.localeCompare(right))
}

export const resolveDocShell = (slug: string, locale: Locale, telefuncConfig?: TelefuncSystemConfig) => {
  const doc = docs[slug]
  if (!doc) {
    return null
  }

  const resolvedLocale = doc[locale] ? locale : doc[DEFAULT_LOCALE] ? DEFAULT_LOCALE : null
  if (!resolvedLocale) {
    return null
  }

  const resolvedDocsConfig = resolveTelefuncSystemConfig(telefuncConfig ?? telefuncSystemConfig)

  return {
    config: {
      ...resolvedDocsConfig.defaultDocConfig,
      ...getSharedDocConfig(slug),
    },
    resolvedLocale,
  }
}

export const getDocHeadings = (slug: string, locale: Locale) => {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '')
  return docs[normalizedSlug]?.[locale]?.headings ?? []
}

export const hasDocSlug = (slug: string) => {
  return Boolean(docs[slug.replace(/^\/+|\/+$/g, '')])
}

export const hasDocPageForLocale = (slug: string, locale: Locale) => {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '')
  return Boolean(docs[normalizedSlug]?.[locale])
}

export const getPrerenderDocUrls = (telefuncConfig?: TelefuncSystemConfig) => {
  const resolvedDocsConfig = resolveTelefuncSystemConfig(telefuncConfig ?? telefuncSystemConfig)
  const urls = new Set<string>()
  const docSlugs = getAllDocSlugs()

  for (const locale of locales) {
    if (hasDocPageForLocale(resolvedDocsConfig.defaultSlug, locale)) {
      urls.add(localizePathname(getDocsIndexPath(resolvedDocsConfig), locale))
    }

    for (const slug of docSlugs) {
      if (!hasDocPageForLocale(slug, locale)) {
        continue
      }

      urls.add(localizePathname(getDocPath(slug, resolvedDocsConfig), locale))
    }
  }

  return [...urls]
}
