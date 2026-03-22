import type { ReactNode } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import LanguageSwitcher from '@/components/LanguageSwitch'
import LayoutComponent from '@/components/LayoutComponent'
import ThemeSwitch from '@/components/ThemeSwitch'
import appConfig from '@/lib/config'
import { t } from '@/lib/i18n/messages'
import { localizeHref } from '@/lib/i18n/routing'

const PageLayout = (props: { children: ReactNode }) => {
  const pageContext = usePageContext()

  return (
    <>
      <header className="bg-base-300 fixed z-10 w-full h-16 border-vike-grey border-b">
        <LayoutComponent className="h-full">
          <header className="py-4 flex justify-between items-center h-full">
            <a href={localizeHref('/', pageContext.locale)} className="flex gap-2 items-center">
              <img src={`${appConfig.publicAssets}vike.svg`} alt="Vike Logo" className="w-6 h-6 dark:hidden" />
              <img src={`${appConfig.publicAssets}vike-dark.svg`} alt="Vike Logo" className="w-6 h-6 hidden dark:block" />
              <span className="font-medium">Vike {t(pageContext.locale, 'header', 'docsHome')}</span>
            </a>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeSwitch />
            </div>
          </header>
        </LayoutComponent>
      </header>
      <div className="pt-16">{props.children}</div>
    </>
  )
}

export default PageLayout
