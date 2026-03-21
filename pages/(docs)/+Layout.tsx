import cm from '@classmatejs/solid'
import { JSXElement } from 'solid-js'
import LayoutComponent from '@/components/LayoutComponent'
import Sidebar from '@/pages/(docs)/Sidebar'

const ProseContainer = cm.section`
  prose 
  prose-neutral 
  dark:prose-invert 
  prose-a:text-primary
  prose-code:bg-base-200!
  prose-pre:bg-base-200!
`

const DocsLayout = (props: { children: JSXElement }) => {
  return (
    <>
      <div class="absolute w-full h-[60svh] top-0 left-0 bg-linear-to-b from-base-200 to-base-300" />
      <LayoutComponent class="flex mx-auto gap-20">
        <div class="w-90">
          <Sidebar />
        </div>
        <ProseContainer class="flex-1">{props.children}</ProseContainer>
      </LayoutComponent>
    </>
  )
}

export default DocsLayout
