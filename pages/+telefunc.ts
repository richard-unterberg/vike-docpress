import type { TelefuncSystemConfig } from '../lib/docs/systemConfig'

export default {
  defaultSlug: 'get-started',
  defaultDocConfig: {
    tableOfContents: true,
  },
  footer: {
    pagination: true,
  },
  search: {
    indexedWordsPerDoc: 2400,
  },
} satisfies TelefuncSystemConfig
