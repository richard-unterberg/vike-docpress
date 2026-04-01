import type { TelefuncSystemConfig } from '@/lib/docs/systemConfig'
import { getTelefuncSystemConfig } from '@/lib/docs/systemConfig'
import type { DocPageData } from './contentData'

const normalizeSlug = (value: string) => value.replace(/^\/+|\/+$/g, '')

type PageContextLike = {
  config?: {
    telefunc?: TelefuncSystemConfig
  }
  data?: unknown
  routeParams?: {
    slug?: string
  }
}

export const getDocPageDataFromPageContext = (pageContext: PageContextLike): DocPageData | null => {
  const value = pageContext.data

  if (!value || typeof value !== 'object') {
    return null
  }

  const docSlug = Reflect.get(value, 'docSlug')
  const resolvedLocale = Reflect.get(value, 'resolvedLocale')
  const headings = Reflect.get(value, 'headings')
  const config = Reflect.get(value, 'config')

  if (
    typeof docSlug === 'string' &&
    typeof resolvedLocale === 'string' &&
    Array.isArray(headings) &&
    config &&
    typeof config === 'object'
  ) {
    return value as DocPageData
  }

  return null
}

export const getCurrentDocSlug = (pageContext: PageContextLike) => {
  const docData = getDocPageDataFromPageContext(pageContext)
  if (docData) {
    return docData.docSlug
  }

  const docsConfig = getTelefuncSystemConfig(pageContext)
  const requestedSlug = normalizeSlug(pageContext.routeParams?.slug ?? '')
  return requestedSlug || docsConfig.defaultSlug
}
