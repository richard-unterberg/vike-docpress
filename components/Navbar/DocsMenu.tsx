import cm from '@classmatejs/react'
import { BookText, Code, Cpu, Megaphone } from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'
import { t } from '@/lib/i18n/messages'

const MenuItem = cm.a.variants<{ $active?: boolean }>({
  base: 'btn btn-sm btn-neutral px-3 uppercase',
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

  return (
    <ul className="flex items-center font-semibold gap-2">
      <li tabIndex={0}>
        <MenuItem $active>
          <BookText className="w-4 h-4" />
          {t(locale, 'header', 'docsHome')}
        </MenuItem>
      </li>
      <li tabIndex={0}>
        <MenuItem>
          <Cpu className="w-4 h-4" />
          {t(locale, 'header', 'apiHome')}
        </MenuItem>
      </li>
      <li tabIndex={0}>
        <MenuItem>
          <Code className="w-4 h-4" />
          {t(locale, 'header', 'docsForDevs')}
        </MenuItem>
      </li>
      <li tabIndex={0}>
        <MenuItem>
          <Megaphone className="w-4 h-4" />
          {t(locale, 'header', 'blogHome')}
        </MenuItem>
      </li>
    </ul>
  )
}

export default DocsMenu
