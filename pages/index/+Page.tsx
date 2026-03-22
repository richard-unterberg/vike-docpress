import { usePageContext } from 'vike-react/usePageContext'
import { t } from '@/lib/i18n/messages'
import { localizeHref } from '@/lib/i18n/routing'

const LandingPage = () => {
  const pageContext = usePageContext()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t(pageContext.locale, 'home', 'title')}</h1>
      <p className="max-w-xl text-center text-base-content/70">{t(pageContext.locale, 'home', 'subtitle')}</p>
      <a href={localizeHref('/get-started', pageContext.locale)} className="btn btn-outline btn-primary">
        {t(pageContext.locale, 'home', 'cta')} ✨
      </a>
    </div>
  )
}

export default LandingPage
