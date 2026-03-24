import { type BundledLanguage, bundledLanguages, bundledLanguagesAlias, codeToHast } from 'shiki'

type HastNode = {
  children?: HastNode[]
  properties?: Record<string, unknown>
}

const FALLBACK_LANGUAGE = 'text'

const SHIKI_THEMES = {
  light: 'github-light',
  dark: 'github-dark',
} as const

const knownLanguages = new Set<string>([...Object.keys(bundledLanguages), ...Object.keys(bundledLanguagesAlias)])

const stripTrailingNewline = (value: string) => {
  return value.endsWith('\n') ? value.slice(0, -1) : value
}

export const resolveShikiLanguage = (language?: string) => {
  if (!language) return FALLBACK_LANGUAGE

  const normalizedLanguage = language.toLowerCase()
  return knownLanguages.has(normalizedLanguage) ? (normalizedLanguage as BundledLanguage) : FALLBACK_LANGUAGE
}

export const highlightCodeToPre = async (code: string, language?: string) => {
  const tree = (await codeToHast(stripTrailingNewline(code), {
    lang: resolveShikiLanguage(language),
    themes: SHIKI_THEMES,
    defaultColor: false,
  })) as HastNode

  return tree.children?.[0] ?? null
}
