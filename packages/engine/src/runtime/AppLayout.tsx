import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import type { DocsConfig } from '../types.js'
import { Navbar } from './components/Navbar/index.js'
import { UserSettingsSync } from './components/UserSettingsSync.js'
import { getActiveSectionByPathname, resolveDocsConfig } from './resolveDocsConfig.js'

interface AppLayoutProps {
  children: ReactNode
  docsConfig: DocsConfig
}

export const AppLayout = ({ children, docsConfig }: AppLayoutProps) => {
  const pageContext = usePageContext()
  const resolvedConfig = resolveDocsConfig(docsConfig)
  const activeSection = getActiveSectionByPathname(resolvedConfig, pageContext.urlPathname)
  const [queryClient] = useState(() => new QueryClient())

  return (
    // todo: we should try vike-react-query instead
    <QueryClientProvider client={queryClient}>
      <UserSettingsSync theme={resolvedConfig.theme} />
      <div className="min-h-screen bg-base-100 text-base-content">
        <Navbar
          brand={resolvedConfig.brand}
          activeSectionId={activeSection?.id ?? null}
          algolia={resolvedConfig.algolia}
          navbarItems={resolvedConfig.navbarItems}
          sections={resolvedConfig.sections}
          theme={resolvedConfig.theme}
        />
        <div className="pt-16">{children}</div>
      </div>
    </QueryClientProvider>
  )
}
