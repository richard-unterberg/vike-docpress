import cm, { cmMerge } from '@classmatejs/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { renderInlineMarkdown } from '../../../components/renderInlineMarkdown.js'
import { withSiteBaseUrl } from '../../../nivelAssets.js'
import type {
  DocsThemeConfig,
  ResolvedDocsAlgoliaConfig,
  ResolvedDocsBrandConfig,
  ResolvedNavbarItem,
} from '../../../types.js'
import { Brand } from '../Brand.js'
import { LayoutComponent } from '../LayoutComponent.js'
import { Search } from '../Search.js'
import { ThemeSwitch } from '../ThemeSwitch.js'
import { MegaMenu } from './MegaMenu/index.js'
import { useNavbarScroll } from './useNavbarScroll.js'

interface NavbarProps {
  brand: ResolvedDocsBrandConfig
  activeSectionId: string | null
  algolia: ResolvedDocsAlgoliaConfig | null
  navbarItems: ResolvedNavbarItem[]
  theme: Required<DocsThemeConfig>
}

export const Navbar = ({ brand, activeSectionId, algolia, navbarItems, theme }: NavbarProps) => {
  const { urlPathname } = usePageContext()
  const isLandingPage = urlPathname === '/'
  const { isLandingPageScrolled } = useNavbarScroll(isLandingPage)

  const showChrome = !isLandingPage || isLandingPageScrolled

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)

  return (
    <>
      <StyledNavbar $showChrome={showChrome}>
        <LayoutComponent className="h-full">
          {isLandingPage ? (
            <div className="relative z-3 flex h-full items-center justify-between py-4">
              <div className="flex flex-1 items-center gap-4">
                <Brand brand={brand} />
              </div>
              <nav
                aria-label="Primary"
                className="top-0 left-0 flex min-w-0 flex-1 items-center justify-center gap-4 overflow-x-auto"
              >
                <ul className="flex items-center gap-4 font-semibold">
                  {navbarItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={withSiteBaseUrl(item.href)}
                        className={cmMerge(
                          'btn text-lg btn-ghost min-w-30 px-2 whitespace-nowrap tracking-tight hover:bg-primary-muted-light hover:border-primary',
                        )}
                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        {renderInlineMarkdown(item.title)}
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-1 items-center justify-end gap-2">
                <Search algolia={algolia} />
                <ThemeSwitch theme={theme} />
              </div>
            </div>
          ) : (
            <div className="relative z-3 flex h-full items-center justify-between py-4">
              <div className="flex w-80 flex-1 items-center justify-between gap-2 lg:flex-none">
                <Brand brand={brand} />
              </div>
              <nav
                aria-label="Primary"
                className="top-0 left-0 flex flex-1 items-center justify-start gap-4 overflow-x-auto lg:pl-6 xl:pl-10"
              >
                <ul className="flex items-center gap-2 font-semibold">
                  {navbarItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={withSiteBaseUrl(item.href)}
                        className={cmMerge(
                          'btn btn-sm px-2 whitespace-nowrap text-base tracking-tight',
                          item.id === activeSectionId ? 'btn-primary btn-soft' : 'btn-ghost',
                        )}
                      >
                        {renderInlineMarkdown(item.title)}
                      </a>
                    </li>
                  ))}
                </ul>
                <Search algolia={algolia} />
              </nav>
              <div className="flex w-78 flex-1 items-center justify-end gap-2 lg:flex-none">
                <ThemeSwitch theme={theme} />
              </div>
            </div>
          )}
        </LayoutComponent>
      </StyledNavbar>
      <MegaMenu isActive={isMegaMenuOpen} />
    </>
  )
}

const StyledNavbar = cm.header<{ $showChrome: boolean }>`
  fixed top-0 left-0 z-20 h-16 w-full border-b border-transparent
  ${({ $showChrome }) =>
    $showChrome &&
    `
    bg-linear-to-t 
    from-base-100/96
    via-base-100/95 
    to-base-100
    backdrop-grayscale 
    border-base-muted-light 
    dark:shadow 
  `}
`
