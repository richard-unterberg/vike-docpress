import { syncGeneratedDocsPages } from '@unterberg/nivel/runtime/node'
import { config } from '../pages/+docs'

syncGeneratedDocsPages({
  rootDir: process.cwd(),
  docsConfig: config,
})
