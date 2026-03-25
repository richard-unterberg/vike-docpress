import { getPrerenderDocUrls } from '@/lib/docs/content'
import docs from '@/pages/+docs'

const onBeforePrerenderStart = () => {
  return getPrerenderDocUrls(docs)
}

export default onBeforePrerenderStart
