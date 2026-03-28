import type { MdexSystemConfig } from '../lib/docs/systemConfig'

export default {
  docsBasePath: '',
  defaultSlug: 'get-started',
  defaultDocConfig: {
    tableOfContents: true,
  },
  search: {
    indexedWordsPerDoc: 240,
  },
} satisfies MdexSystemConfig
