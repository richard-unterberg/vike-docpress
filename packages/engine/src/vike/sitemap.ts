import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import { resolveDocsConfig } from '../docs/resolveDocsConfig.js'
import type { DocsConfig } from '../docs/types.js'
import { loadDocsConfig } from '../runtime/node/loadDocsConfig.js'

const GENERATED_DIRNAME = '(nivel-generated)'
const SITEMAP_FILENAME = 'sitemap.xml'
const ROBOTS_FILENAME = 'robots.txt'

type SitemapEntry = {
  lastmod?: string
  loc: string
}

const normalizeRoutePath = (value: string) => {
  const normalized = value.trim().replace(/^\/+|\/+$/g, '')
  return normalized ? `/${normalized}/` : '/'
}

const normalizeSiteUrl = (value: string) => {
  const normalized = value.trim()

  if (!normalized) {
    throw new Error('Docs siteUrl must be a non-empty absolute URL when sitemap support is enabled.')
  }

  const url = new URL(normalized)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Docs siteUrl must use http or https. Received ${JSON.stringify(value)}.`)
  }

  if (url.search || url.hash) {
    throw new Error(`Docs siteUrl cannot include query strings or hashes. Received ${JSON.stringify(value)}.`)
  }

  const pathname = url.pathname.replace(/\/+$/g, '')
  url.pathname = pathname || '/'

  return url.toString().replace(/\/+$/g, '')
}

const joinPublicUrl = (siteUrl: string, routePath: string) => {
  return routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}`
}

const normalizePublicUrl = (value: string) => {
  const url = new URL(value)
  url.search = ''
  url.hash = ''
  url.pathname = normalizeRoutePath(url.pathname)
  return url.toString()
}

const xmlEscape = (value: string) => {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

const getLastMod = (filePath: string) => {
  return fs.statSync(filePath).mtime.toISOString()
}

const collectFiles = (directoryPath: string): string[] => {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name)
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath]
  })
}

const resolveFilesystemRoutePathFromPageFile = (pagesRootPath: string, filePath: string) => {
  const relativeDirPath = path.relative(pagesRootPath, path.dirname(filePath)).split(path.sep).join(path.posix.sep)
  const segments = relativeDirPath ? relativeDirPath.split('/').filter(Boolean) : []
  const resolvedSegments: string[] = []

  for (const segment of segments) {
    if (segment === 'index') {
      continue
    }

    if (segment.startsWith('(') && segment.endsWith(')')) {
      continue
    }

    if (segment.startsWith('_') || segment.startsWith('@')) {
      return null
    }

    resolvedSegments.push(segment)
  }

  return resolvedSegments.length === 0 ? '/' : `/${resolvedSegments.join('/')}/`
}

const collectFilesystemPageEntries = (options: { rootDir: string; siteUrl: string }) => {
  const pagesRootPath = path.join(options.rootDir, 'pages')
  const generatedPagesRootPath = path.join(pagesRootPath, GENERATED_DIRNAME)
  const entries: SitemapEntry[] = []

  for (const filePath of collectFiles(pagesRootPath)) {
    if (!path.basename(filePath).startsWith('+Page.')) {
      continue
    }

    if (filePath.startsWith(generatedPagesRootPath)) {
      continue
    }

    const routePath = resolveFilesystemRoutePathFromPageFile(pagesRootPath, filePath)

    if (!routePath) {
      continue
    }

    entries.push({
      lastmod: getLastMod(filePath),
      loc: normalizePublicUrl(joinPublicUrl(options.siteUrl, routePath)),
    })
  }

  return entries
}

const getDocsCanonicalEntries = (options: { docsConfig: DocsConfig; rootDir: string; siteUrl: string }) => {
  const resolvedDocsConfig = resolveDocsConfig(options.docsConfig)
  const contentRootPath = path.join(options.rootDir, resolvedDocsConfig.contentDir)

  return resolvedDocsConfig.pages.map((page) => {
    return {
      lastmod: getLastMod(path.join(contentRootPath, page.source)),
      loc: normalizePublicUrl(joinPublicUrl(options.siteUrl, page.href)),
    } satisfies SitemapEntry
  })
}

const getSitemapXml = (entries: SitemapEntry[]) => {
  const urlEntries = entries.map((entry) => {
    return [
      '  <url>',
      `    <loc>${xmlEscape(entry.loc)}</loc>`,
      ...(entry.lastmod ? [`    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>`] : []),
      '  </url>',
    ].join('\n')
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    '</urlset>',
    '',
  ].join('\n')
}

const getRobotsTxtContent = (options: { siteUrl: string; allowCrawlers: boolean }) => {
  if (!options.allowCrawlers) {
    return ['User-agent: *', 'Disallow: /'].join('\n')
  }

  return ['User-agent: *', 'Disallow: /cdn-cgi/', `Sitemap: ${options.siteUrl}/${SITEMAP_FILENAME}`].join('\n')
}

const getSitemapArtifacts = (options: { rootDir: string; docsConfig: DocsConfig }) => {
  const siteUrl = options.docsConfig.siteUrl?.trim() ? normalizeSiteUrl(options.docsConfig.siteUrl) : null

  if (!siteUrl) {
    return null
  }

  const filesystemPageEntries = collectFilesystemPageEntries({
    rootDir: options.rootDir,
    siteUrl,
  })
  const docsCanonicalEntries = getDocsCanonicalEntries({
    docsConfig: options.docsConfig,
    rootDir: options.rootDir,
    siteUrl,
  })
  const filesystemPageLocs = new Set(filesystemPageEntries.map((entry) => entry.loc))
  const docsCanonicalLocs = docsCanonicalEntries.map((entry) => entry.loc)
  const collidingLoc = docsCanonicalLocs.find((loc) => filesystemPageLocs.has(loc))

  if (collidingLoc) {
    throw new Error(
      `Nivel sitemap collision: docs canonical URL ${JSON.stringify(collidingLoc)} conflicts with a consumer filesystem page.`,
    )
  }

  const sitemapEntriesByLoc = new Map<string, SitemapEntry>()

  for (const entry of [...filesystemPageEntries, ...docsCanonicalEntries]) {
    sitemapEntriesByLoc.set(entry.loc, entry)
  }

  const sitemapEntries = [...sitemapEntriesByLoc.values()].sort((left, right) => {
    return left.loc.localeCompare(right.loc)
  })

  return {
    robotsTxt: getRobotsTxtContent({
      siteUrl,
      allowCrawlers: options.docsConfig.robots ?? true,
    }),
    sitemapXml: getSitemapXml(sitemapEntries),
  }
}

const writeStaticAsset = (filePath: string, contents: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, contents)
}

const createNivelSitemapPlugin = (docsConfig: DocsConfig): Plugin => {
  let resolvedBase = '/'
  let resolvedRootDir = process.cwd()

  const matchesRequestPath = (requestUrl: string | undefined, pathname: string) => {
    if (!requestUrl) {
      return false
    }

    const normalizedRequestUrl = requestUrl.split('?')[0] ?? requestUrl
    return (
      normalizedRequestUrl === pathname ||
      (resolvedBase !== '/' && normalizedRequestUrl === `${resolvedBase}${pathname.slice(1)}`)
    )
  }

  const getServerArtifacts = async (server: ViteDevServer) => {
    const nextDocsConfig = await loadDocsConfig({
      rootDir: server.config.root,
      loadModule: (modulePath) => server.ssrLoadModule(modulePath),
    })

    return getSitemapArtifacts({
      rootDir: server.config.root,
      docsConfig: nextDocsConfig,
    })
  }

  return {
    name: 'nivel-sitemap-plugin',
    configResolved(config) {
      resolvedBase = config.base
      resolvedRootDir = config.root
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const isSitemapRequest = matchesRequestPath(req.url, `/${SITEMAP_FILENAME}`)
        const isRobotsRequest = matchesRequestPath(req.url, `/${ROBOTS_FILENAME}`)

        if (!isSitemapRequest && !isRobotsRequest) {
          next()
          return
        }

        const artifacts = await getServerArtifacts(server)

        if (!artifacts) {
          res.statusCode = 404
          res.end()
          return
        }

        res.setHeader('Cache-Control', 'no-store')

        if (isSitemapRequest) {
          res.setHeader('Content-Type', 'application/xml')
          res.end(artifacts.sitemapXml)
          return
        }

        res.setHeader('Content-Type', 'text/plain')
        res.end(artifacts.robotsTxt)
      })
    },
    closeBundle() {
      if (this.environment.config.consumer !== 'client') {
        return
      }

      const artifacts = getSitemapArtifacts({
        rootDir: resolvedRootDir,
        docsConfig,
      })

      if (!artifacts) {
        return
      }

      const outputDirectory = path.resolve(resolvedRootDir, this.environment.config.build.outDir)

      writeStaticAsset(path.join(outputDirectory, SITEMAP_FILENAME), artifacts.sitemapXml)
      writeStaticAsset(path.join(outputDirectory, ROBOTS_FILENAME), artifacts.robotsTxt)
    },
  }
}

export const createNivelSitemapPlugins = (docsConfig: DocsConfig): Plugin[] => {
  if (!docsConfig.siteUrl?.trim()) {
    return []
  }

  return [createNivelSitemapPlugin(docsConfig)]
}
