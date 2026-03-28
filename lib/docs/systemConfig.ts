import mdex from '../../pages/+mdex'
import type { DocConfig } from './config'

export type MdexSearchConfig = {
  indexedWordsPerDoc?: number
}

export type MdexSystemConfig = {
  docsBasePath?: string
  /** @deprecated Use docsBasePath instead. */
  basePath?: string
  defaultSlug?: string
  defaultDocConfig?: DocConfig
  search?: MdexSearchConfig
}

export type ResolvedMdexSystemConfig = {
  docsBasePath: string
  defaultSlug: string
  defaultDocConfig: DocConfig
  search: {
    indexedWordsPerDoc: number
  }
}

const normalizeDocsBasePath = (value: string | undefined) => {
  const normalized = (value ?? '/docs').trim()

  if (normalized === '' || normalized === '/') {
    return ''
  }

  return `/${normalized.replace(/^\/+|\/+$/g, '')}`
}

const normalizeDocSlug = (value: string | undefined) => {
  return (value ?? '').replace(/^\/+|\/+$/g, '')
}

export const resolveMdexSystemConfig = (config?: MdexSystemConfig): ResolvedMdexSystemConfig => {
  return {
    docsBasePath: normalizeDocsBasePath(config?.docsBasePath ?? config?.basePath),
    defaultSlug: normalizeDocSlug(config?.defaultSlug) || 'get-started',
    defaultDocConfig: config?.defaultDocConfig ?? { tableOfContents: true },
    search: {
      indexedWordsPerDoc: Math.max(1, Math.floor(config?.search?.indexedWordsPerDoc ?? 120)),
    },
  }
}

export const mdexSystemConfig = resolveMdexSystemConfig(mdex)

export const getMdexSystemConfig = (value?: { config?: { mdex?: MdexSystemConfig } }) => {
  return resolveMdexSystemConfig(value?.config?.mdex ?? mdexSystemConfig)
}

export const getDocsIndexPath = (config: MdexSystemConfig | ResolvedMdexSystemConfig = mdexSystemConfig) => {
  const resolved = resolveMdexSystemConfig(config)
  return resolved.docsBasePath || `/${resolved.defaultSlug}`
}

export const getDocPath = (slug: string, config: MdexSystemConfig | ResolvedMdexSystemConfig = mdexSystemConfig) => {
  const resolved = resolveMdexSystemConfig(config)
  const normalizedSlug = normalizeDocSlug(slug)

  if (normalizedSlug === '') {
    return getDocsIndexPath(resolved)
  }

  return resolved.docsBasePath ? `${resolved.docsBasePath}/${normalizedSlug}` : `/${normalizedSlug}`
}

export const matchDocPath = (
  pathname: string,
  config: MdexSystemConfig | ResolvedMdexSystemConfig = mdexSystemConfig,
) => {
  const resolved = resolveMdexSystemConfig(config)
  const normalizedPathname = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`

  if (resolved.docsBasePath === '') {
    const slug = normalizeDocSlug(normalizedPathname)
    return slug || null
  }

  if (normalizedPathname === resolved.docsBasePath) {
    return ''
  }

  const prefix = `${resolved.docsBasePath}/`
  if (!normalizedPathname.startsWith(prefix)) {
    return null
  }

  return normalizeDocSlug(normalizedPathname.slice(prefix.length))
}
