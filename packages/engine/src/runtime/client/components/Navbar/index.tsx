import cm from '@classmatejs/react'
import { useEffect, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { getActiveSectionByPathname } from '../../../../docs/resolveDocsConfig'
import { useDocsGlobalContext } from '../../docsGlobalContext'
import { useDocsSearchActions } from '../../store/runtime-store'
import { LayoutComponent } from '../LayoutComponent'
import { Search } from '../Search'
import DocsNavbar from './DocsNavbar'
import LandingPageNavbar from './LandingPageNavbar'
import { MegaMenu } from './MegaMenu'
import useMegaMenu from './useMegaMenu'

const LARGE_SCREEN_MEDIA_QUERY = '(min-width: 1024px)'

const NavbarNew = () => {
  const docs = useDocsGlobalContext()
  const { urlPathname, urlParsed } = usePageContext()
  const isLandingPage = urlParsed.pathname === '/'
  const sections = docs.sidebarSections
  const activeSection = getActiveSectionByPathname(docs, urlPathname)
  const { toggle: toggleSearch } = useDocsSearchActions()
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const { closeMegaMenu, hoveredSectionId, isMegaMenuOpen, openMegaMenu, scheduleMegaMenuOpen, scheduleMegaMenuClose } =
    useMegaMenu({
      activeSectionId: activeSection?.id,
      sections,
    })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQueryList = window.matchMedia(LARGE_SCREEN_MEDIA_QUERY)
    const updateLargeScreenState = () => {
      setIsLargeScreen(mediaQueryList.matches)
    }

    updateLargeScreenState()
    mediaQueryList.addEventListener('change', updateLargeScreenState)

    return () => {
      mediaQueryList.removeEventListener('change', updateLargeScreenState)
    }
  }, [])

  return (
    <StyledNavbar $border={isLandingPage}>
      <LayoutComponent>
        {isLandingPage ? (
          <LandingPageNavbar
            openMegaMenu={openMegaMenu}
            scheduleMegaMenuOpen={scheduleMegaMenuOpen}
            scheduleMegaMenuClose={scheduleMegaMenuClose}
            toggleSearch={toggleSearch}
            closeMegaMenu={closeMegaMenu}
            hoveredSectionId={hoveredSectionId}
            isMegaMenuOpen={isMegaMenuOpen}
          />
        ) : (
          <DocsNavbar
            openMegaMenu={openMegaMenu}
            scheduleMegaMenuOpen={scheduleMegaMenuOpen}
            scheduleMegaMenuClose={scheduleMegaMenuClose}
            toggleSearch={toggleSearch}
            closeMegaMenu={closeMegaMenu}
            activeSection={activeSection}
            hoveredSectionId={hoveredSectionId}
            isMegaMenuOpen={isMegaMenuOpen}
          />
        )}
      </LayoutComponent>
      <Search />
      {isLargeScreen ? (
        <MegaMenu
          sections={sections}
          activeSectionId={activeSection?.id}
          hoveredSectionId={hoveredSectionId}
          isActive={isMegaMenuOpen}
          onOpen={openMegaMenu}
          onClose={scheduleMegaMenuClose}
          isLandingPage={isLandingPage}
        />
      ) : null}
    </StyledNavbar>
  )
}

export default NavbarNew

const StyledNavbar = cm.header<{ $border: boolean }>`
  top-0 left-0 z-20 w-full bg-base-100
  pt-0 h-14
  ${({ $border }) => ($border ? 'relative' : 'fixed')}
`
