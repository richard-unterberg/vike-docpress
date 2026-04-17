import { useCallback, useEffect, useRef, useState } from 'react'
import type { ResolvedDocsSection } from '../../../../docs/types'

const useMegaMenu = ({ activeSectionId, sections }: { activeSectionId?: string; sections: ResolvedDocsSection[] }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const megaMenuCloseTimeoutRef = useRef<number | null>(null)
  const [hoveredSectionId, setHoveredSectionId] = useState<string | undefined>(activeSectionId ?? sections[0]?.id)

  const clearMegaMenuCloseTimeout = useCallback(() => {
    if (megaMenuCloseTimeoutRef.current === null) {
      return
    }

    window.clearTimeout(megaMenuCloseTimeoutRef.current)
    megaMenuCloseTimeoutRef.current = null
  }, [])

  const openMegaMenu = (currentSectionId?: string) => {
    if (currentSectionId !== undefined) {
      setHoveredSectionId(currentSectionId)
    }

    clearMegaMenuCloseTimeout()
    setIsMegaMenuOpen(true)
  }

  const closeMegaMenu = () => {
    clearMegaMenuCloseTimeout()
    setIsMegaMenuOpen(false)
  }

  const scheduleMegaMenuClose = () => {
    clearMegaMenuCloseTimeout()
    megaMenuCloseTimeoutRef.current = window.setTimeout(() => {
      setIsMegaMenuOpen(false)
      megaMenuCloseTimeoutRef.current = null
    }, 140)
  }

  useEffect(() => {
    return () => {
      clearMegaMenuCloseTimeout()
    }
  }, [clearMegaMenuCloseTimeout])

  useEffect(() => {
    setHoveredSectionId(activeSectionId ?? sections[0]?.id)
  }, [activeSectionId, sections])

  return {
    isMegaMenuOpen,
    hoveredSectionId,
    openMegaMenu,
    closeMegaMenu,
    scheduleMegaMenuClose,
  }
}

export default useMegaMenu
