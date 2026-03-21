import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vike from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import { defineConfig } from 'vite'
import tsConf from './lib/tsconf'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const pathAliases = Object.entries(tsConf.compilerOptions.paths).map(([key, [value]]) => {
  if (key.includes('*')) {
    const find = new RegExp(`^${key.replace('/*', '/(.*)$')}`)
    const replacement = path.resolve(__dirname, value.replace('/*', '/$1'))
    return { find, replacement }
  }
  return { find: key, replacement: path.resolve(__dirname, value) }
})

export default defineConfig({
  plugins: [vike(), vikeSolid()],
  resolve: {
    alias: [...pathAliases],
  },
  // build: {
  //   cssCodeSplit: false,
  // },
  server: {
    port: 5555,
  },
  preview: {
    port: 5556,
  },
})
