

## mdex

mdex is a documentation starter built on top of [Vike](https://vike.dev). It keeps Vike's SSR and routing model while layering an MDX-first docs workflow on top.

## Docs config

Shared docs settings can be defined with `docs.config.ts` or `docs.config.js`.

These files are inherited by logical doc path, so one config applies to every translated `content.<locale>.mdx` file for that route.

Example:

```ts
// pages/(docs)/(content)/intro/docs.config.ts
import type { DocConfig } from '@/lib/docs/config'

export default {
  tableOfContents: false,
} satisfies DocConfig
```

You can also place a config higher up, for example `pages/(docs)/docs.config.ts`, to apply defaults to all docs below it.

## Root docs settings

App-wide docs behavior is configured through Vike in `pages/+docs.ts` and exposed at `pageContext.config.docs`.

Example:

```ts
// pages/+docs.ts
import type { DocsSystemConfig } from '@/lib/docs/systemConfig'

export default {
  basePath: '/docs',
  defaultSlug: 'get-started',
  defaultDocConfig: {
    tableOfContents: true,
  },
} satisfies DocsSystemConfig
```

Use this for global defaults such as the docs URL base or the default doc slug. Use `docs.config.ts` for per-document overrides shared by all translations.
