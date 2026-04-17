import { useDocsGlobalContext } from '../../docsGlobalContext'
import SocialIcons from '../SocialLinks'
import { ThemeSwitch } from '../ThemeSwitch'

const AsideButtons = () => {
  const docs = useDocsGlobalContext()

  return (
    <div className="flex-1 justify-end gap-2 flex">
      <div className="hidden lg:block">
        <SocialIcons />
      </div>
      <ThemeSwitch theme={docs.theme} />
    </div>
  )
}

export default AsideButtons
