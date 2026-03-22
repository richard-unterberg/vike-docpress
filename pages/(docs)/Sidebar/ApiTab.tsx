import { usePageContext } from 'vike-react/usePageContext'
import { getApiNavigation } from '@/pages/(docs)/Sidebar/apiNavigation'
import SidebarNavigation from '@/pages/(docs)/Sidebar/SidebarNavigation'

const ApiTab = () => {
  const pageContext = usePageContext()
  const groups = getApiNavigation(pageContext.locale)

  return (
    <SidebarNavigation groups={groups} currentPathname={pageContext.urlPathnameLocalized ?? pageContext.urlPathname} />
  )
}

export default ApiTab
