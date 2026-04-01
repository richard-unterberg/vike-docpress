import type { Locale } from '../i18n/config'

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim()

const stripInlineMdSyntax = (value: string) => {
  return normalizeWhitespace(
    value
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/<!--.*?-->/g, ' ')
      .replace(/\{[^}]*\}/g, ' ')
      .replace(/\\([\\`*_[\]{}()#+\-.!>])/g, '$1')
      .replace(/[*_~|]/g, '')
      .replace(/&[a-z]+;/gi, ' '),
  )
}

const getFenceMarker = (line: string) => {
  const match = line.match(/^\s{0,3}(`{3,}|~{3,})/)
  return match?.[1]?.[0] ?? null
}

const stripBlockMarkdown = (line: string) => {
  return line
    .replace(/^\s{0,3}#{1,6}\s+/, '')
    .replace(/^\s{0,3}>\s?/, '')
    .replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/, '')
    .replace(/^\s{0,3}\|/, '')
}

export const extractDocTitle = (source: string, fallback: string) => {
  let activeFenceMarker: string | null = null

  for (const line of source.split('\n')) {
    const fenceMarker = getFenceMarker(line)

    if (activeFenceMarker) {
      if (fenceMarker === activeFenceMarker) activeFenceMarker = null
      continue
    }

    if (fenceMarker) {
      activeFenceMarker = fenceMarker
      continue
    }

    const match = line.match(/^\s{0,3}#\s+(.*?)(?:\s+#+\s*)?$/)
    if (!match) continue

    const title = stripInlineMdSyntax(match[1] ?? '')
    if (title) {
      return title
    }
  }

  return fallback
}

export const extractSearchTextFromMdx = (source: string) => {
  const lines: string[] = []
  let activeFenceMarker: string | null = null

  for (const line of source.split('\n')) {
    const fenceMarker = getFenceMarker(line)

    if (activeFenceMarker) {
      if (fenceMarker === activeFenceMarker) activeFenceMarker = null
      continue
    }

    if (fenceMarker) {
      activeFenceMarker = fenceMarker
      continue
    }

    if (/^\s*(?:import|export)\b/.test(line)) continue

    const strippedLine = stripInlineMdSyntax(stripBlockMarkdown(line))
    if (strippedLine) {
      lines.push(strippedLine)
    }
  }

  return normalizeWhitespace(lines.join(' '))
}

const limitTextByWhitespace = (value: string, maxWords: number) => {
  return normalizeWhitespace(value).split(/\s+/).slice(0, maxWords).join(' ')
}

export const limitSearchText = (value: string, maxWords: number, locale: Locale) => {
  const normalized = normalizeWhitespace(value)
  if (!normalized) return ''

  if (typeof Intl.Segmenter !== 'function') {
    return limitTextByWhitespace(normalized, maxWords)
  }

  const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })
  let wordsSeen = 0
  let limited = ''

  for (const segment of segmenter.segment(normalized)) {
    limited += segment.segment

    if (segment.isWordLike) {
      wordsSeen += 1
      if (wordsSeen >= maxWords) {
        break
      }
    }
  }

  return normalizeWhitespace(limited)
}
