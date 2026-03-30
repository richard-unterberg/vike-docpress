import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import { isLocale, type Locale, locales } from '../i18n/config'
import { buildSearchIndexes } from './buildIndex'

const virtualModuleId = 'virtual:search-index-manifest'
const resolvedVirtualModuleId = '\0virtual:search-index-manifest'
const devAssetPrefix = '/@search-index/'

const getDevAssetPath = (locale: Locale) => `${devAssetPrefix}${locale}.json`

const getBuildModuleSource = (assetRefIds: Record<Locale, string>) => {
  return [
    'export const searchIndexUrls = {',
    ...locales.map((locale) => `  ${JSON.stringify(locale)}: import.meta.ROLLUP_FILE_URL_${assetRefIds[locale]},`),
    '}',
  ].join('\n')
}

const getDevModuleSource = () => {
  return [
    'export const searchIndexUrls = {',
    ...locales.map((locale) => `  ${JSON.stringify(locale)}: ${JSON.stringify(getDevAssetPath(locale))},`),
    '}',
  ].join('\n')
}

const getSsrModuleSource = (base: string) => {
  return [
    'export const searchIndexUrls = {',
    ...locales.map(
      (locale) => `  ${JSON.stringify(locale)}: ${JSON.stringify(`${base}assets/search-index.${locale}.json`)},`,
    ),
    '}',
  ].join('\n')
}

const serveSearchIndex = (server: ViteDevServer) => {
  server.middlewares.use((req, res, next) => {
    const urlPath = req.url?.split('?')[0] ?? ''
    if (!urlPath.startsWith(devAssetPrefix)) {
      next()
      return
    }

    const locale = urlPath.slice(devAssetPrefix.length).replace(/\.json$/, '')
    if (!isLocale(locale)) {
      next()
      return
    }

    const indexes = buildSearchIndexes()
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(indexes[locale], null, 2))
  })
}

const searchIndexAssetFiles: Record<Locale, string> = {
  en: 'assets/search-index.en.json',
  zh: 'assets/search-index.zh.json',
}

const patchAssetsManifest = (config: ResolvedConfig) => {
  const manifestPath = path.resolve(config.root, 'dist/assets.json')
  if (!fs.existsSync(manifestPath)) {
    return
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<string, unknown>

  for (const locale of locales) {
    manifest[`_search-index.${locale}.json`] = {
      file: searchIndexAssetFiles[locale],
      isAsset: true,
      src: `virtual:search-index:${locale}`,
    }
  }

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}

export const searchIndexPlugin = (): Plugin => {
  let config: ResolvedConfig | null = null
  let isSsrBuild = false
  const assetRefIds = {} as Partial<Record<Locale, string>>

  return {
    name: 'search-index-plugin',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      isSsrBuild = Boolean(resolvedConfig.build.ssr)
    },
    buildStart() {
      if (!config || config.command !== 'build' || isSsrBuild) {
        return
      }

      const indexes = buildSearchIndexes()

      for (const locale of locales) {
        assetRefIds[locale] = this.emitFile({
          type: 'asset',
          fileName: searchIndexAssetFiles[locale],
          source: JSON.stringify(indexes[locale], null, 2),
        })
      }
    },
    configureServer(server) {
      serveSearchIndex(server)
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }

      return null
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) {
        return null
      }

      if (!config || config.command === 'serve') {
        return getDevModuleSource()
      }

      if (isSsrBuild) {
        return getSsrModuleSource(config.base)
      }

      const completeAssetRefs = Object.fromEntries(
        locales.map((locale) => {
          const refId = assetRefIds[locale]
          if (!refId) {
            throw new Error(`Missing emitted search index asset for locale "${locale}".`)
          }

          return [locale, refId]
        }),
      ) as Record<Locale, string>

      return getBuildModuleSource(completeAssetRefs)
    },
    closeBundle() {
      if (!config || config.command !== 'build') {
        return
      }

      patchAssetsManifest(config)
    },
  }
}
