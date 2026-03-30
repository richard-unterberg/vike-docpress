import type { PageContext } from 'vike/types'
import { getDocsHeadMetadata } from './docMetadata'

const title = (pageContext: PageContext) => {
  return `${getDocsHeadMetadata(pageContext)?.title ?? ''} | telefunc`
}
export default title
