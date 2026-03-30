import { getPrerenderDocUrls } from '@/lib/docs/contentManifest'
import { DEFAULT_LOCALE, locales } from '@/lib/i18n/config'
import telefunc from '@/pages/+telefunc'

const onBeforePrerenderStart = () => {
  return getPrerenderDocUrls(telefunc).filter((url) => {
    return locales.some(
      (locale) => locale !== DEFAULT_LOCALE && (url === `/${locale}` || url.startsWith(`/${locale}/`)),
    )
  })
}

export default onBeforePrerenderStart
