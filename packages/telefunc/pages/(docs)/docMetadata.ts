import type { PageContext } from 'vike/types'
import { getDocHeadingMetadata } from '@/lib/docs/headings'
import { getCurrentDocSlug } from '@/lib/docs/pageContext'
import pageConfig from '@/pages/+config'

const getFallbackMetadata = () => {
  return {
    title: typeof pageConfig.title === 'string' ? pageConfig.title : null,
    description: typeof pageConfig.description === 'string' ? pageConfig.description : null,
  }
}

export const getDocsHeadMetadata = (pageContext: PageContext) => {
  const docSlug = getCurrentDocSlug(pageContext)
  return getDocHeadingMetadata(docSlug, pageContext.locale) ?? getFallbackMetadata()
}
