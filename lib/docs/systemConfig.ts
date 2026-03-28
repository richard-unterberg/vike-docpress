import mdex from '../../pages/+mdex'
import type { DocConfig } from './config'

export type MdexSearchConfig = {
  indexedWordsPerDoc?: number
}

export type MdexSystemConfig = {
  defaultSlug?: string
  defaultDocConfig?: DocConfig
  search?: MdexSearchConfig
}

export type ResolvedMdexSystemConfig = {
  defaultSlug: string
  defaultDocConfig: DocConfig
  search: {
    indexedWordsPerDoc: number
  }
}

const normalizeDocSlug = (value: string | undefined) => {
  return (value ?? '').replace(/^\/+|\/+$/g, '')
}

export const resolveMdexSystemConfig = (config?: MdexSystemConfig): ResolvedMdexSystemConfig => {
  return {
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
  return `/${resolved.defaultSlug}`
}

export const getDocPath = (slug: string, config: MdexSystemConfig | ResolvedMdexSystemConfig = mdexSystemConfig) => {
  const resolved = resolveMdexSystemConfig(config)
  const normalizedSlug = normalizeDocSlug(slug)

  if (normalizedSlug === '') {
    return getDocsIndexPath(resolved)
  }

  return `/${normalizedSlug}`
}

export const matchDocPath = (pathname: string) => {
  const normalizedPathname = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`
  const slug = normalizeDocSlug(normalizedPathname)
  return slug || null
}
