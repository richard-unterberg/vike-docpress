import cm from '@classmatejs/react'
import type { ReactNode } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import LayoutComponent from '@/components/LayoutComponent'
import appConfig from '@/lib/config'
import { getDocPage } from '@/lib/docs/content'
import { getLogicalPathname } from '@/lib/i18n/routing'
import DocsFooter from '@/pages/(docs)/Footer'
import Sidebar from '@/pages/(docs)/Sidebar'
import TableOfContents from '@/pages/(docs)/TableOfContents'

const ProseContainer = cm.section`
  prose 
  prose-neutral
  max-w-none
  dark:prose-invert 
  prose-a:text-primary
  prose-code:bg-base-200!
  prose-pre:bg-base-200!
`

const DocsLayout = (props: { children: ReactNode }) => {
  const pageContext = usePageContext()
  const pathname = pageContext.urlPathnameLocalized ?? pageContext.urlPathname
  const docSlug = getLogicalPathname(pathname).replace(/^\/+/, '')
  const doc = getDocPage(docSlug, pageContext.locale)

  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <div className="w-500 h-300 absolute -top-70 -right-100 z-0">
          <img
            src={`${appConfig.publicAssets}decorators/dot.png`}
            alt=""
            width={400}
            height={400}
            className="w-full h-full object-fill absolute inset-0"
          />
        </div>
      </div>
      <LayoutComponent className="flex mx-auto gap-10 xl:gap-14">
        <div className="w-90 shrink-0 relative">
          <Sidebar />
        </div>
        <div className="pt-16 mt-10 relative">
          <ProseContainer className="min-w-0 flex-1 z-1 relative" data-doc-content>
            {props.children}
          </ProseContainer>
          <DocsFooter />
        </div>
        <TableOfContents headings={doc?.headings ?? []} />
      </LayoutComponent>
    </>
  )
}

export default DocsLayout
