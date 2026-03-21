import Moon from 'lucide-solid/icons/moon'
import Sun from 'lucide-solid/icons/sun'

const ThemeSwitch = () => {
  return (
    <label class="flex items-center cursor-pointer gap-2">
      <Sun class="h-4 w-4" />
      <input type="checkbox" value="synthwave" class="toggle toggle-sm" />
      <Moon class="h-4 w-4" />
    </label>
  )
}

export default ThemeSwitch
