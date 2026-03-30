import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { defineConfig, type PluginOption } from 'vite'
import { rehypeDocHeadings } from './lib/docs/rehypeDocHeadings'
import { rehypeShikiCodeBlocks } from './lib/docs/rehypeShikiCodeBlocks'
import { docsPagesPlugin } from './lib/docs/vitePlugin'
import { searchIndexPlugin } from './lib/search/vitePlugin'
import tsConf from './tsconfig.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Generated docs pages live in an untracked directory. Vike's default git-based
// crawler misses nested plus files in untracked directories, so force glob
// crawling to make generated routes visible in dev and build.
process.env.VIKE_CRAWL ??= JSON.stringify({ git: false })

const normalizeBaseUrl = (value: string | undefined) => {
  const normalized = value?.trim()

  if (!normalized || normalized === '/') {
    return '/'
  }

  return `/${normalized.replace(/^\/+|\/+$/g, '')}/`
}

const base = normalizeBaseUrl(process.env.PAGES_BASE_PATH)

export const pathAliases = Object.entries(tsConf.compilerOptions.paths).map(([key, [value]]) => {
  if (key.includes('*')) {
    const find = new RegExp(`^${key.replace('/*', '/(.*)$')}`)
    const replacement = path.resolve(__dirname, value.replace('/*', '/$1'))
    return { find, replacement }
  }
  return { find: key, replacement: path.resolve(__dirname, value) }
})

export default defineConfig({
  base,
  plugins: [
    {
      ...mdx({
        jsxImportSource: '@/lib/mdx',
        rehypePlugins: [rehypeDocHeadings, rehypeShikiCodeBlocks],
      }),
      enforce: 'pre',
    },
    docsPagesPlugin(),
    react(),
    vike(),
    tailwindcss() as PluginOption,
    searchIndexPlugin(),
  ],
  resolve: {
    alias: [...pathAliases],
  },
  server: {
    port: 3001,
  },
  preview: {
    port: 3002,
  },
})
