import { getPrerenderDocUrls } from '@/lib/docs/content'

const onBeforePrerenderStart = () => {
  return getPrerenderDocUrls()
}

export default onBeforePrerenderStart
