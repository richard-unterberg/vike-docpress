import { usePageContext } from 'vike-react/usePageContext'
import { t } from '@/lib/i18n/messages'

const Page = () => {
  const pageContext = usePageContext()
  if (pageContext.is404) {
    return (
      <>
        <h1>{t(pageContext.locale, 'error', 'notFoundTitle')}</h1>
        <p>{t(pageContext.locale, 'error', 'notFoundBody')}</p>
      </>
    )
  }

  return (
    <>
      <h1>{t(pageContext.locale, 'error', 'internalTitle')}</h1>
      <p>{t(pageContext.locale, 'error', 'internalBody')}</p>
    </>
  )
}
export default Page
