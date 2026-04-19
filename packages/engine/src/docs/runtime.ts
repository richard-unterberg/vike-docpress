import type { ResolvedDocsPage, ResolvedDocsSection } from './types.js'

export const isExternalHref = (value: string) => {
  return /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('mailto:') || value.startsWith('tel:')
}

const normalizeBasePath = (value: string) => {
  const normalized = value.trim()

  if (!normalized) {
    throw new Error('Docs basePath must be a non-empty absolute path.')
  }

  if (!normalized.startsWith('/') || normalized.startsWith('//')) {
    throw new Error(`Docs basePath must start with "/". Received ${JSON.stringify(value)}.`)
  }

  if (normalized.includes('?') || normalized.includes('#')) {
    throw new Error(`Docs basePath cannot include query strings or hashes. Received ${JSON.stringify(value)}.`)
  }

  const collapsed = normalized.replace(/\/+/g, '/').replace(/\/+$/g, '')
  return collapsed === '' ? '/' : collapsed
}

const normalizeSlug = (value: string) => value.replace(/^\/+|\/+$/g, '')

const joinDocsHref = (basePath: string, slug: string) => {
  const normalizedBasePath = normalizeBasePath(basePath)
  const normalizedSlug = normalizeSlug(slug)

  if (!normalizedSlug) {
    return normalizedBasePath === '/' ? '/' : `${normalizedBasePath}/`
  }

  return normalizedBasePath === '/' ? `/${normalizedSlug}/` : `${normalizedBasePath}/${normalizedSlug}/`
}

const normalizePathname = (value: string) => {
  const pathname = value.split('?')[0]?.split('#')[0] ?? value
  const normalized = pathname.trim().replace(/\/+$/g, '')
  return normalized === '' ? '/' : `${normalized}/`.replace(/\/+/g, '/')
}

export const resolveDocsHref = (basePath: string, href: string) => {
  const normalized = href.trim()

  if (!normalized || normalized.startsWith('#') || isExternalHref(normalized)) {
    return null
  }

  const pathname = normalized.split('?')[0]?.split('#')[0] ?? normalized

  if (!pathname) {
    return null
  }

  if (pathname.startsWith('/')) {
    const normalizedPathname = normalizePathname(pathname)
    const normalizedBasePath = normalizeBasePath(basePath)

    if (normalizedBasePath === '/') {
      return normalizedPathname
    }

    return normalizedPathname === `${normalizedBasePath}/` || normalizedPathname.startsWith(`${normalizedBasePath}/`)
      ? normalizedPathname
      : null
  }

  if (pathname.startsWith('./') || pathname.startsWith('../')) {
    return null
  }

  return joinDocsHref(basePath, pathname)
}

export const getResolvedSectionById = (
  config: { sections?: ResolvedDocsSection[]; sidebarSections?: ResolvedDocsSection[] },
  sectionId: string,
) => {
  const sections = config.sections ?? config.sidebarSections ?? []
  return sections.find((section) => section.id === sectionId) ?? null
}

export const getResolvedPageByPathname = (config: { pages: ResolvedDocsPage[] }, pathname: string) => {
  const normalizedPathname = normalizePathname(pathname)

  return (
    config.pages.find((page) => {
      if (normalizePathname(page.href) === normalizedPathname) {
        return true
      }

      return page.aliasHrefs.some((aliasHref) => normalizePathname(aliasHref) === normalizedPathname)
    }) ?? null
  )
}

export const getActiveSectionByPathname = (
  config: { pages: ResolvedDocsPage[]; sections?: ResolvedDocsSection[]; sidebarSections?: ResolvedDocsSection[] },
  pathname: string,
) => {
  const activePage = getResolvedPageByPathname(config, pathname)

  if (!activePage) {
    return null
  }

  return getResolvedSectionById(config, activePage.sectionId)
}

export const isSamePagePathname = (page: Pick<ResolvedDocsPage, 'href' | 'aliasHrefs'>, pathname: string) => {
  const normalizedPathname = normalizePathname(pathname)

  if (normalizePathname(page.href) === normalizedPathname) {
    return true
  }

  return page.aliasHrefs.some((aliasHref) => normalizePathname(aliasHref) === normalizedPathname)
}
