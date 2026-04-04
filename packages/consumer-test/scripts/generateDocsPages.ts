import { syncGeneratedDocsPages } from '@unterberg/nivel/runtime'
import docsConfig from '../pages/+docs'

syncGeneratedDocsPages({
  rootDir: process.cwd(),
  docsConfig,
})
