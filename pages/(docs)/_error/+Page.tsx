import { Frown } from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'
import LayoutComponent from '@/components/LayoutComponent'
import { t } from '@/lib/i18n/messages'

const Page = () => {
  const pageContext = usePageContext()

  const headline = pageContext.is404
    ? t(pageContext.locale, 'error', 'notFoundTitle')
    : t(pageContext.locale, 'error', 'internalTitle')

  const message = pageContext.is404
    ? t(pageContext.locale, 'error', 'notFoundBody')
    : t(pageContext.locale, 'error', 'internalBody')

  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <Frown className="w-16 h-16 mb-4" />
      <h1>{headline}</h1>
      <p>{message}</p>
    </div>
  )
}
export default Page
