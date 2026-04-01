import baseAssets from '@/lib/baseAssets'
import type { Locale } from '@/lib/i18n/config'
import { localizeHref } from '@/lib/i18n/routing'

const BrandLogo = ({ locale, showText = true }: { locale: Locale; showText?: boolean }) => (
  <a href={localizeHref('/', locale)} className="flex gap-2 items-center text-base-content">
    <img src={`${baseAssets}favicon/favicon.svg`} alt="telefunc logo" className="w-6 h-6" />
    <span className="font-semibold text-xl">{showText && <span>Telefunc</span>}</span>
  </a>
)

export default BrandLogo
