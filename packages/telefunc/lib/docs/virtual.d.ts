declare module 'virtual:docs-content-manifest' {
  export type DocsContentHeading = {
    depth: number
    id: string
    title: string
  }

  export type DocsContentEntry = {
    headings: DocsContentHeading[]
    locale: string
    path: string
    routeId: string
  }

  export const docsContentEntries: DocsContentEntry[]
  export default docsContentEntries
}
