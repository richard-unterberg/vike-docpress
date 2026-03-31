import { cmMerge } from '@classmatejs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { getCurrentDocSlug } from '@/lib/docs/pageContext'
import { getTelefuncSystemConfig } from '@/lib/docs/systemConfig'
import { t } from '@/lib/messages'
import { getMenuDocLinks, type MenuDocLink } from '@/lib/navigation/menuNavigation'

const renderInlineMarkdown = (title: ReactNode): ReactNode => {
  if (typeof title !== 'string') return title

  return title.split(/(`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: local presentational split
        <code className="font-medium" key={index}>
          {part.slice(1, -1)}
        </code>
      )
    }

    // biome-ignore lint/suspicious/noArrayIndexKey: local presentational split
    return <Fragment key={index}>{part}</Fragment>
  })
}

const PaginationCard = (props: {
  item: MenuDocLink
  direction: 'previous' | 'next'
  label: string
  className?: string
}) => {
  const isPrevious = props.direction === 'previous'

  return (
    <a
      href={props.item.href}
      className={cmMerge(
        'group rounded-box border border-base-muted-light bg-base-100 p-5 no-underline transition-colors hover:bg-base-200 hover:border-primary-muted-medium',
        isPrevious ? 'text-left' : 'text-right',
        props.className,
      )}
    >
      <div className="flex flex-col justify-between">
        <p className="text-lg mb-2 font-semibold text-base-content">{renderInlineMarkdown(props.item.title)}</p>
        <div
          className={cmMerge(
            'flex items-center gap-1 text-base-muted transition-colors group-hover:text-base-content',
            isPrevious ? 'justify-start' : 'justify-end',
          )}
        >
          {isPrevious && <ChevronLeft className="h-4 w-4" />}
          <span>{props.label}</span>
          {!isPrevious && <ChevronRight className="h-4 w-4" />}
        </div>
      </div>
    </a>
  )
}

const DocsPagination = () => {
  const pageContext = usePageContext()
  const { locale } = pageContext
  const docsConfig = getTelefuncSystemConfig(pageContext)

  if (!docsConfig.footer.pagination) {
    return null
  }

  const docSlug = getCurrentDocSlug(pageContext)
  const menuDocLinks = getMenuDocLinks(locale, docsConfig)
  const currentIndex = menuDocLinks.findIndex((item) => item.docPath === docSlug)

  if (currentIndex < 0) {
    return null
  }

  const previousItem = currentIndex > 0 ? menuDocLinks[currentIndex - 1] : null
  const nextItem = currentIndex < menuDocLinks.length - 1 ? menuDocLinks[currentIndex + 1] : null

  if (!previousItem && !nextItem) {
    return null
  }

  const previousLabel = t(locale, 'docs', 'previous')
  const nextLabel = t(locale, 'docs', 'next')

  return (
    <nav className="mt-16 mb-10" aria-label={`${previousLabel} ${nextLabel}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        {previousItem && (
          <PaginationCard item={previousItem} direction="previous" label={previousLabel} className="sm:col-start-1" />
        )}
        {nextItem && (
          <PaginationCard
            item={nextItem}
            direction="next"
            label={nextLabel}
            className={cmMerge(!previousItem && 'sm:col-start-2')}
          />
        )}
      </div>
    </nav>
  )
}

export default DocsPagination
