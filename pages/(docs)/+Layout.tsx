import cm from '@classmatejs/solid'
import { JSXElement } from 'solid-js'
import LayoutComponent from '@/components/LayoutComponent'

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
      <LayoutComponent class="grid grid-cols-12 gap-4 mx-auto">
        <div class="col-span-3">Sidebar</div>
        <ProseContainer class="col-span-9 ">{props.children}</ProseContainer>
      </LayoutComponent>
    </>
  )
}

export default DocsLayout
