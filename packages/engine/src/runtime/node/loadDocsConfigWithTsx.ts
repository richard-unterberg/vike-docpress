import { require as tsxRequire } from 'tsx/cjs/api'
import { loadDocsConfig } from './loadDocsConfig.js'

export const loadDocsConfigWithTsx = async (rootDir: string) => {
  return loadDocsConfig({
    rootDir,
    loadModule: async (modulePath) => tsxRequire(modulePath, import.meta.url),
  })
}
