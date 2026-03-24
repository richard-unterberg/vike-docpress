import { highlightCodeToPre, resolveShikiLanguage } from '../shiki'

type HastNode = {
  children?: HastNode[]
  properties?: Record<string, unknown>
  tagName?: string
  type?: string
  value?: string
}

const getClassNames = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => String(entry).split(/\s+/)).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value.split(/\s+/).filter(Boolean)
  }

  return []
}

const getNodeText = (node: HastNode): string => {
  if (node.type === 'text') {
    return node.value ?? ''
  }

  return (node.children ?? []).map(getNodeText).join('')
}

const getCodeLanguage = (node: HastNode) => {
  const classNames = getClassNames(node.properties?.className ?? node.properties?.class)
  const languageClass = classNames.find((className) => className.startsWith('language-'))
  return languageClass?.slice('language-'.length)
}

const isCodeBlock = (node: HastNode) => {
  return node.type === 'element' && node.tagName === 'pre' && node.children?.[0]?.tagName === 'code'
}

const visit = async (node: HastNode) => {
  for (const [index, child] of (node.children ?? []).entries()) {
    if (isCodeBlock(child)) {
      const codeNode = child.children?.[0]
      if (!codeNode) continue

      const language = getCodeLanguage(codeNode)
      const highlightedBlock = await highlightCodeToPre(getNodeText(codeNode), language)
      if (!highlightedBlock) continue

      highlightedBlock.properties ??= {}
      highlightedBlock.properties['data-language'] = resolveShikiLanguage(language)
      node.children![index] = highlightedBlock
      continue
    }

    await visit(child)
  }
}

export const rehypeShiki = () => {
  return async (tree: HastNode) => {
    await visit(tree)
  }
}
