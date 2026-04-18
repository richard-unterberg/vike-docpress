import { createNivelVikeConfig } from '@unterberg/nivel/vike'
import type { Config } from 'vike/types'
import docsConfig from './+docs'

const config = {
  ...createNivelVikeConfig(docsConfig),
  prerender: true,
} satisfies Config

export default config
