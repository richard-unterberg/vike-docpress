# Monorepo Baseline with Shared MDX Package

## Summary

- Use a pnpm workspace with two packages: `packages/telefunc` for the Vike docs app and `packages/universal-mdx-mods` for publishable shared MDX components.
- Keep the first extraction intentionally small: `Alert`, `Table`, and `RepoLink`.
- Keep Vike page context, routing, doc metadata, and app-local translations in `packages/telefunc`.
- Prepare a framework-agnostic runtime adapter surface in `@unterberg/universal-mdx-mods` for later migrations such as `Link` and code-block orchestration.

## Current Baseline

- Root tooling now owns workspace scripts, Biome, Knip, Lefthook, and TypeScript project references.
- `packages/telefunc` is the current app, still private, and now consumes shared components via `@unterberg/universal-mdx-mods`.
- `packages/universal-mdx-mods` is configured for npm publication through `tsup` with ESM output and declaration files.

## Shared Package Rules

- Keep the package logic-light and host-agnostic.
- Do not pass raw Vike `pageContext` into the package.
- Prefer explicit props for translatable labels in early migrations.
- Future context-aware components should consume the adapter contract instead of importing app-local runtime helpers directly.

## Future Work

- Introduce the runtime adapter/provider in active use and migrate `Link` only after href localization and breadcrumb/title inference are represented through that contract.
- Move code-block components and MDX helpers into `@unterberg/universal-mdx-mods` in a later extraction wave.
- Revisit which docs-shell components can become reusable once routing, localization, and translation boundaries are stable.
