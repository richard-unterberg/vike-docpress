import cm from '@classmatejs/react'
import { BookText, Cpu } from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'
import { localizeHref } from '@/lib/i18n/routing'
import { t } from '@/lib/messages'

const MenuItem = cm.a.variants<{ $active?: boolean }>({
  base: 'btn btn-sm btn-neutral px-2 uppercase whitespace-nowrap',
  variants: {
    $active: {
      true: '',
      false: 'btn-soft ',
    },
  },
  defaultVariants: {
    $active: false,
  },
})

const DocsMenu = () => {
  const { locale } = usePageContext()
  const docsHomeHref = localizeHref('/docs', locale)

  return (
    <ul className="flex items-center font-semibold gap-2">
      <li>
        <MenuItem $active tabIndex={0} href={docsHomeHref}>
          <BookText className="w-4 h-4" />
          {t(locale, 'header', 'docsHome')}
        </MenuItem>
      </li>
      <li>
        <MenuItem tabIndex={0}>
          <Cpu className="w-4 h-4" />
          {t(locale, 'header', 'componentsHome')}
        </MenuItem>
      </li>
    </ul>
  )
}

export default DocsMenu
