import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'
import docs from '@/pages/+docs'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  meta: {
    docs: {
      env: {
        server: true,
        client: true,
      },
      global: true,
    },
  },
  // https://vike.dev/head-tags
  title: 'mdex',
  description: 'mdex docs starter kit',
  docs,
  htmlAttributes: { 'data-theme': 'vike-dark' },
  passToClient: ['locale', 'urlPathnameLocalized'],
  extends: [vikeReact],
  prerender: true,
} satisfies Config
