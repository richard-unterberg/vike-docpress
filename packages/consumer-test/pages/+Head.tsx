import { MetaHead } from '@unterberg/nivel/client'
import docs from './+docs'

export const Head = () => {
  return <MetaHead docsConfig={docs} />
}
