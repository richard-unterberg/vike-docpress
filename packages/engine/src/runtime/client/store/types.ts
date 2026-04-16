export type DocsSearchState = {
  isOpen: boolean
  query: string
}

export type DocsSearchActions = {
  open: () => void
  close: () => void
  toggle: () => void
  setQuery: (query: string) => void
  clearQuery: () => void
}

export type DocsSearchSlice = DocsSearchState & DocsSearchActions

export type DocsSidebarState = {
  openNodes: Record<string, boolean>
}

export type DocsSidebarActions = {
  setNodeOpen: (nodeId: string, isOpen: boolean) => void
}

export type DocsSidebarSlice = DocsSidebarState & DocsSidebarActions
