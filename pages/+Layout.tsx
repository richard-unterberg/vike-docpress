import type { JSXElement } from 'solid-js'
import vikeLogo from '@/assets/vike.svg'
import vikeLogoDark from '@/assets/vike-dark.svg'
import ThemeSwitch from '@/components/ThemeSwitch'

const PageLayout = ({ children }: { children: JSXElement }) => {
  return (
    <div class="p-4">
      <header class="flex justify-between items-center">
        <a href="/" class="flex gap-2 items-center">
          <img src={vikeLogo} alt="Vike Logo" class="w-6 dark:hidden" />
          <img src={vikeLogoDark} alt="Vike Logo" class="w-6 hidden dark:block" />
          <span class="text-lg font-bold">Vike</span>
        </a>
        <ThemeSwitch />
      </header>
      {children}
      <footer class="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vike. All rights reserved.
      </footer>
    </div>
  )
}

export default PageLayout
