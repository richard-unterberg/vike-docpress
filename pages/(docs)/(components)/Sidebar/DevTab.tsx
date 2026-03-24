import { usePageContext } from 'vike-react/usePageContext'
import { getDevNavigation } from '@/lib/navigation/devNavigation'
import SidebarNavigation from '@/pages/(docs)/(components)/Sidebar/SidebarNavigation'

const DevTab = () => {
  const { locale, urlPathnameLocalized, urlPathname } = usePageContext()
  const groups = getDevNavigation(locale)
  return <SidebarNavigation groups={groups} currentPathname={urlPathnameLocalized ?? urlPathname} />
}

export default DevTab
