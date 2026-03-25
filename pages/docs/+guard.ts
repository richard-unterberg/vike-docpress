import { redirect, render } from 'vike/abort'
import type { PageContext } from 'vike/types'
import { DEFAULT_DOC_SLUG, getDocPage } from '@/lib/docs/content'
import { localizeHref } from '@/lib/i18n/routing'

const guard = async (pageContext: PageContext) => {
  const routeParams = pageContext.routeParams as { slug?: string }
  const docSlug = routeParams.slug?.replace(/^\/+|\/+$/g, '')

  // is landing on /docs, redirect to default doc
  if (!docSlug) {
    throw redirect(localizeHref(`/docs/${DEFAULT_DOC_SLUG}`, pageContext.locale))
  }

  const entry = getDocPage(`docs/${docSlug}`, pageContext.locale)

  if (!entry?.Page) {
    throw render(404)
  }
}

export default guard
