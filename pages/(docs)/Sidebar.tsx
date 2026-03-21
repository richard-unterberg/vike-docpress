import { cmMerge } from '@classmatejs/solid'
import { LucideIcon } from 'lucide-solid'
import Compass from 'lucide-solid/icons/compass'
import Map from 'lucide-solid/icons/map'
import Plug from 'lucide-solid/icons/plug'
import Rocket from 'lucide-solid/icons/rocket'
import Sprout from 'lucide-solid/icons/sprout'
import { createMemo, For, JSXElement } from 'solid-js'
import { usePageContext } from 'vike-solid/usePageContext'
import { getHeadingData } from '@/lib/headings-flat'

type Heading = {
  title: JSXElement
  href: string
}

type Category = {
  title?: JSXElement
  children?: Heading[]
}

type MenuGroup = {
  icon?: LucideIcon
  title: JSXElement
  links?: (Heading | Category)[]
}

const isCategory = (item: Heading | Category): item is Category => 'children' in item

const isActiveHref = (currentPathname: string, href: string) => {
  return href === '/' ? currentPathname === href : currentPathname.startsWith(href)
}

const hasActiveChild = (items: (Heading | Category)[], currentPathname: string): boolean => {
  return items.some((item) =>
    isCategory(item)
      ? Boolean(item.children) && hasActiveChild(item.children as Heading[], currentPathname)
      : isActiveHref(currentPathname, item.href),
  )
}

const renderInlineMarkdown = (title: JSXElement): JSXElement => {
  if (typeof title !== 'string') return title

  return title.split(/(`[^`]+`)/g).map((part) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code>{part.slice(1, -1)}</code>
    }

    return part
  })
}

const menu: MenuGroup[] = [
  {
    icon: Sprout,
    title: 'Get Started',
    links: [getHeadingData('scaffoldNewVikeApp'), getHeadingData('addSsrSsgToVite')],
  },
  {
    icon: Compass,
    title: 'Overview',
    links: [
      getHeadingData('whyVike'),
      getHeadingData('faq'),
      getHeadingData('openSourcePricing'),
      getHeadingData('freeProgram'),
      getHeadingData('extensions'),
      getHeadingData('team'),
    ],
  },
  {
    icon: Map,
    title: 'Guides',
    links: [
      {
        title: 'Basics',
        children: [
          getHeadingData('dataFetching'),
          getHeadingData('preRendering'),
          getHeadingData('ssrVsSpa'),
          getHeadingData('headTags'),
          getHeadingData('commonIssues'),
        ],
      },
      {
        title: 'Routing',
        children: [getHeadingData('routing'), getHeadingData('baseUrl'), getHeadingData('activeLinks')],
      },
      {
        title: 'More',
        children: [
          getHeadingData('staticDirectory'),
          getHeadingData('serverClient'),
          getHeadingData('environmentVariables'),
          getHeadingData('httpHeaders'),
          getHeadingData('i18n'),
          getHeadingData('pathAliases'),
          getHeadingData('preloading'),
          getHeadingData('apiRoutes'),
        ],
      },
    ],
  },
  {
    title: 'Deploy',
    icon: Rocket,
    links: [
      {
        title: 'Static hosts',
        children: [
          getHeadingData('staticHostsOverview'),
          getHeadingData('githubPages'),
          getHeadingData('netlify'),
          getHeadingData('cloudflarePages'),
        ],
      },
      {
        title: 'Full-stack (serverless)',
        children: [
          getHeadingData('cloudflare'),
          getHeadingData('vercel'),
          getHeadingData('awsLambda'),
          getHeadingData('netlifyFunctions'),
          getHeadingData('edgeonePages'),
        ],
      },
      {
        title: 'Full-stack (self-hosted)',
        children: [getHeadingData('aws'), getHeadingData('docker'), getHeadingData('selfHostedOther')],
      },
      getHeadingData('otherDeployment'),
    ],
  },
  {
    title: 'Integration',
    icon: Plug,
    links: [
      getHeadingData('authentication'),
      getHeadingData('serverIntegration'),
      getHeadingData('errorTracking'),
      getHeadingData('cssInJs'),
      getHeadingData('markdown'),
      getHeadingData('store'),
      getHeadingData('graphql'),
      getHeadingData('vanillaUiTools'),
      getHeadingData('analytics'),
      getHeadingData('componentLibraries'),
      getHeadingData('dataFetchingIntegration'),
      getHeadingData('serviceWorker'),
      getHeadingData('viewTransitions'),
      getHeadingData('uiFramework'),
      getHeadingData('seeAlso'),
    ],
  },
]

function MenuLink(props: Heading & { currentPathname: string }) {
  return (
    <li>
      <a
        href={props.href}
        class={cmMerge('justify-start', isActiveHref(props.currentPathname, props.href) && 'menu-active')}
      >
        {renderInlineMarkdown(props.title)}
      </a>
    </li>
  )
}

function MenuCategory(props: Category & { currentPathname: string }) {
  const _isOpen = createMemo(() => (props.children ? hasActiveChild(props.children, props.currentPathname) : false))

  return (
    <li>
      <details open>
        <summary class="text-vike-grey-200">{renderInlineMarkdown(props.title)}</summary>
        <ul>
          <For each={props.children}>{(item) => <MenuItem item={item} currentPathname={props.currentPathname} />}</For>
        </ul>
      </details>
      
    </li>
  )
}

function MenuItem(props: { item: Heading | Category; currentPathname: string }) {
  return isCategory(props.item) ? (
    <MenuCategory {...props.item} currentPathname={props.currentPathname} />
  ) : (
    <MenuLink {...props.item} currentPathname={props.currentPathname} />
  )
}

const MenuGroupComponent = (props: MenuGroup & { currentPathname: string }) => {
  const Icon = props.icon

  return (
    <li>
      <details open class="">
        <summary class="text-vike-grey-100">
          {Icon && <Icon class="inline w-3 h-3" />}
          <span class="text-base-content font-semibold ">{renderInlineMarkdown(props.title)}</span>
        </summary>
        <ul>
          <For each={props.links}>{(item) => <MenuItem item={item} currentPathname={props.currentPathname} />}</For>
        </ul>
      </details>
    </li>
  )
}

const Sidebar = () => {
  const pageContext = usePageContext()

  return (
    <div class="-translate-x-4 pr-4 h-[calc(100svh-20*var(--spacing))] overflow-y-scroll overflow-x-hidden sticky top-20 border-r border-vike-grey">
      <ul class="menu w-full px-0">
        <For each={menu}>{(group) => <MenuGroupComponent {...group} currentPathname={pageContext.urlPathname} />}</For>
      </ul>
    </div>
  )
}

export default Sidebar
