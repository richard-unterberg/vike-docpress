import type { PageContext } from 'vike/types'
import { hasDocSlug } from '@/lib/docs/content'
import { matchDocPath } from '@/lib/docs/systemConfig'
import { stripLocaleFromPathname } from '@/lib/i18n/routing'

const route = (pageContext: PageContext) => {
  const logicalPathname = stripLocaleFromPathname(pageContext.urlPathname).pathname
  const slug = matchDocPath(logicalPathname)
  if (slug === null) return false
  if (!hasDocSlug(slug)) return false

  return {
    routeParams: {
      slug,
    },
  }
}

export default route
