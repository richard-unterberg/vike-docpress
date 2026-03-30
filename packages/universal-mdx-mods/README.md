# @unterberg/universal-mdx-mods

Reusable MDX-facing React components extracted from the Telefunc docs app.

## Scope

- Presentation-first components that can be reused across Vike apps.
- No bundled Tailwind or DaisyUI setup; the host app remains responsible for styling tokens.
- No direct dependency on Vike page context. Runtime-aware integrations should flow through the shared adapter contract.

## Current Exports

- `Alert`
- `Table`
- `RepoLink`
- `UniversalMdxProvider`
- `useUniversalMdxRuntime`
- runtime contract types for future context-aware components
