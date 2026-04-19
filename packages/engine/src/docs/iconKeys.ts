type DocsIconKind = 'group' | 'page' | 'section'

export const getDocsIconMapKey = (kind: DocsIconKind, id: string) => {
  return `${kind}:${id}`
}
