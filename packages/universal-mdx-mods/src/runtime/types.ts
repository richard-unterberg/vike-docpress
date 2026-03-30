import type { ReactNode } from 'react'

export type UniversalMdxTranslationFn = (group: string, key: string) => string

export type UniversalResolvedDocLink = {
  href: string
  title?: ReactNode
  breadcrumb?: ReactNode[]
}

export type UniversalResolveDocLinkFn = (href: string) => UniversalResolvedDocLink | null

export interface UniversalMdxRuntimeValue {
  locale: string
  t?: UniversalMdxTranslationFn
  localizeHref?: (href: string) => string
  resolveDocLink?: UniversalResolveDocLinkFn
}
