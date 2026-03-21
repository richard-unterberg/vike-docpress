import type { JSXElement } from 'solid-js'
import LayoutComponent from '@/components/LayoutComponent'
import ThemeSwitch from '@/components/ThemeSwitch'
import appConfig from '@/lib/config'

const PageLayout = (props: { children: JSXElement }) => {
  return (
    <>
      <header class="bg-base-300 fixed z-10 w-full h-16 border-vike-grey border-b">
        <LayoutComponent class="h-full">
          <header class="py-4 flex justify-between items-center h-full">
            <a href="/" class="flex gap-2 items-center">
              <img src={`${appConfig.publicAssets}vike.svg`} alt="Vike Logo" class="w-6 dark:hidden" />
              <img src={`${appConfig.publicAssets}vike-dark.svg`} alt="Vike Logo" class="w-6 hidden dark:block" />
              <span class="font-medium">Vike</span>
            </a>
            <ThemeSwitch />
          </header>
        </LayoutComponent>
      </header>
      <div class="pt-20">{props.children}</div>
      <footer class="mt-8 text-center text-sm text-gray-500">The Footer</footer>
    </>
  )
}

export default PageLayout
