import type { PageContext } from 'vike/types'
import { getDocsHeadMetadata } from './docMetadata'

const description = (pageContext: PageContext) => {
  return getDocsHeadMetadata(pageContext).description
}
export default description
