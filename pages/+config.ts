import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: 'mdex',
  description: 'mdex docs starter kit',
  htmlAttributes: { 'data-theme': 'vike-dark' },
  passToClient: ['locale', 'urlPathnameLocalized'],
  extends: [vikeReact],
  prerender: true,
} satisfies Config
