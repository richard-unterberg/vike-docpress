import { getHeadingData, type HeadingKey } from '@/lib/headings'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/messages'
import type { SidebarGroup } from '@/pages/(docs)/(components)/Sidebar/SidebarNavigation'

type DevGroupDefinition = {
  titleKey: 'basics'
  headings: HeadingKey[]
}

const devGroups: DevGroupDefinition[] = [
  {
    titleKey: 'basics',
    headings: ['devElements', 'devDosDonts', 'devTypography', 'devSettingsUtils'],
  },
]

export const getDevNavigation = (locale: Locale): SidebarGroup[] => {
  return devGroups.map((group) => ({
    title: t(locale, 'sidebar', group.titleKey),
    links: group.headings.map((headingKey) => getHeadingData(headingKey, locale)),
  }))
}
