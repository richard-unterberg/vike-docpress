import { JSXElement } from 'solid-js'
import LayoutComponent from '@/components/LayoutComponent'

const DocsLayout = ({ children }: { children: JSXElement }) => {
  return (
    <LayoutComponent class="max-w-7xl grid grid-cols-12 gap-4 mx-auto">
      <div class="bg-warning text-warning-content col-span-4">Sidebar</div>
      <div class="col-span-8">{children}</div>
    </LayoutComponent>
  )
}

export default DocsLayout
