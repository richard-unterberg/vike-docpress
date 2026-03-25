import type { DocConfig } from '@/lib/docs/config'
import docs from '@/pages/+docs'

export type DocsSystemConfig = {
  basePath?: string
  defaultSlug?: string
  defaultDocConfig?: DocConfig
}

export type ResolvedDocsSystemConfig = {
  basePath: string
  defaultSlug: string
  defaultDocConfig: DocConfig
}

const normalizeBasePath = (value: string | undefined) => {
  const normalized = (value ?? '/docs').trim()

  if (normalized === '' || normalized === '/') {
    return ''
  }

  return `/${normalized.replace(/^\/+|\/+$/g, '')}`
}

const normalizeDocSlug = (value: string | undefined) => {
  return (value ?? '').replace(/^\/+|\/+$/g, '')
}

export const resolveDocsSystemConfig = (config?: DocsSystemConfig): ResolvedDocsSystemConfig => {
  return {
    basePath: normalizeBasePath(config?.basePath),
    defaultSlug: normalizeDocSlug(config?.defaultSlug) || 'get-started',
    defaultDocConfig: config?.defaultDocConfig ?? { tableOfContents: true },
  }
}

export const docsSystemConfig = resolveDocsSystemConfig(docs)

export const getDocsSystemConfig = (value?: { config?: { docs?: DocsSystemConfig } }) => {
  return resolveDocsSystemConfig(value?.config?.docs ?? docsSystemConfig)
}

export const getDocsIndexPath = (config: DocsSystemConfig | ResolvedDocsSystemConfig = docsSystemConfig) => {
  const resolved = resolveDocsSystemConfig(config)
  return resolved.basePath || `/${resolved.defaultSlug}`
}

export const getDocPath = (
  slug: string,
  config: DocsSystemConfig | ResolvedDocsSystemConfig = docsSystemConfig,
) => {
  const resolved = resolveDocsSystemConfig(config)
  const normalizedSlug = normalizeDocSlug(slug)

  if (normalizedSlug === '') {
    return getDocsIndexPath(resolved)
  }

  return resolved.basePath ? `${resolved.basePath}/${normalizedSlug}` : `/${normalizedSlug}`
}

export const matchDocPath = (
  pathname: string,
  config: DocsSystemConfig | ResolvedDocsSystemConfig = docsSystemConfig,
) => {
  const resolved = resolveDocsSystemConfig(config)
  const normalizedPathname = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`

  if (resolved.basePath === '') {
    const slug = normalizeDocSlug(normalizedPathname)
    return slug || null
  }

  if (normalizedPathname === resolved.basePath) {
    return ''
  }

  const prefix = `${resolved.basePath}/`
  if (!normalizedPathname.startsWith(prefix)) {
    return null
  }

  return normalizeDocSlug(normalizedPathname.slice(prefix.length))
}
