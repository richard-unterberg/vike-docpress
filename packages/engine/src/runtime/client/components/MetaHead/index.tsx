import { useDocsFromPageGlobalContext } from '../../docsGlobalContext.js'
import { FaviconLinks } from './FaviconLinks.js'
import { FontLinks } from './FontLinks.js'
import { ThemeBootstrap } from './ThemeBootstrap.js'

export const MetaHead = () => {
  const docs = useDocsFromPageGlobalContext()
  const shouldBlockCrawlers = docs.robots === false

  return (
    <>
      <ThemeBootstrap theme={docs.theme} />
      <FaviconLinks head={docs.head} />
      <FontLinks head={docs.head} />
      {shouldBlockCrawlers ? <meta name="robots" content="noindex, nofollow" /> : null}
    </>
  )
}
