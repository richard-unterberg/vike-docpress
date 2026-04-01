import cm from '@classmatejs/react'
import { BookText, Map as MapIcon } from 'lucide-react'
import { useMemo } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { matchDocPath } from '@/lib/docs/systemConfig'
import { headingDefinitions } from '@/lib/headings'
import { getLogicalPathname, localizeHref } from '@/lib/i18n/routing'
import { getMenuGroupKeyForDocPath } from '@/lib/menuNavigation'
import { t } from '@/lib/messages'

type DocsMenuSection = 'docsHome' | 'api'

const MenuItem = cm.a.variants<{ $active?: boolean }>({
  base: 'btn btn px-2 whitespace-nowrap',
  variants: {
    $active: {
      true: 'btn-primary btn-soft',
      false: 'btn-ghost ',
    },
  },
  defaultVariants: {
    $active: false,
  },
})

const getActiveSection = (pathname: string): DocsMenuSection | null => {
  const docSlug = matchDocPath(getLogicalPathname(pathname))

  if (docSlug === null) {
    return null
  }

  const menuGroupKey = getMenuGroupKeyForDocPath(docSlug)

  if (menuGroupKey === 'api') {
    return 'api'
  }

  return 'docsHome'
}

const DocsMenu = () => {
  const pageContext = usePageContext()
  const { locale, urlPathnameLocalized, urlPathname } = pageContext
  const activeSection = getActiveSection(urlPathnameLocalized ?? urlPathname)

  const items = useMemo(
    () => [
      {
        key: 'docsHome',
        title: t(locale, 'header', 'menuDocumentation'),
        icon: BookText,
        href: localizeHref(headingDefinitions.quickStart.docPath, locale),
      },
      {
        key: 'api',
        title: t(locale, 'header', 'menuAPI'),
        icon: MapIcon,
        href: localizeHref(headingDefinitions.apiOverview.docPath, locale),
      },
    ],
    [locale],
  )

  return (
    <ul className="flex items-center font-semibold gap-2">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <li key={item.key}>
            <MenuItem $active={item.key === activeSection} tabIndex={0} href={item.href}>
              <Icon className="w-4 h-4" />
              {item.title}
            </MenuItem>
          </li>
        )
      })}
    </ul>
  )
}

export default DocsMenu
