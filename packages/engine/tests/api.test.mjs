import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { defineDocsConfig, defineDocsGraph } from '../dist/index.js'
import { createNivelVikeConfig, default as nivel } from '../dist/vike.js'

test('defineDocsConfig returns the provided object unchanged', () => {
  const docsConfig = {
    basePath: '/docs',
    graph: { items: [] },
    siteTitle: 'My Docs',
  }

  assert.equal(defineDocsConfig(docsConfig), docsConfig)
})

test('defineDocsGraph returns the provided graph unchanged', () => {
  const docsGraph = {
    items: [
      {
        kind: 'section',
        id: 'docs',
        title: 'Docs',
        items: [],
      },
    ],
  }

  assert.equal(defineDocsGraph(docsGraph), docsGraph)
})

test('createNivelVikeConfig includes the default nivel config and docs-derived metadata', () => {
  const docsConfig = defineDocsConfig({
    basePath: '/docs',
    graph: defineDocsGraph({
      items: [
        {
          kind: 'section',
          id: 'docs',
          title: 'Docs',
          items: [
            {
              kind: 'page',
              id: 'intro',
              title: 'Intro',
              slug: 'intro',
              source: 'content/intro/content.mdx',
            },
          ],
        },
      ],
    }),
    siteTitle: 'My Docs',
    theme: {
      light: 'custom-light',
      dark: 'custom-dark',
      defaultPreference: 'dark',
    },
  })

  const config = createNivelVikeConfig(docsConfig)

  assert.equal(config.title, 'My Docs')
  assert.equal(config.description, 'My Docs documentation')
  assert.equal(config.prerender, true)
  assert.equal(config.trailingSlash, nivel.trailingSlash)
  assert.equal(config.meta.docs.global, true)
  assert.deepEqual(config.htmlAttributes, { 'data-theme': 'custom-dark' })
  assert.equal(Array.isArray(config.extends), true)
  assert.equal(config.extends.length, 1)
})

test('createNivelVikeConfig only enables sitemap plugins when siteUrl is provided', () => {
  const docsGraph = defineDocsGraph({
    items: [
      {
        kind: 'section',
        id: 'docs',
        title: 'Docs',
        items: [
          {
            kind: 'page',
            id: 'intro',
            title: 'Intro',
            slug: 'intro',
            source: 'content/intro/content.mdx',
          },
        ],
      },
    ],
  })
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nivel-vike-config-'))
  const previousCwd = process.cwd()

  try {
    fs.mkdirSync(path.join(rootDir, 'docs', 'content', 'intro'), { recursive: true })
    fs.writeFileSync(path.join(rootDir, 'docs', 'content', 'intro', 'content.mdx'), '# Intro\n')
    process.chdir(rootDir)

    const withSiteUrl = createNivelVikeConfig(
      defineDocsConfig({
        basePath: '/docs',
        graph: docsGraph,
        siteTitle: 'My Docs',
        siteUrl: 'https://docs.example.com',
      }),
    )
    const withoutSiteUrl = createNivelVikeConfig(
      defineDocsConfig({
        basePath: '/docs',
        graph: docsGraph,
        siteTitle: 'My Docs',
      }),
    )
    const withSiteUrlPluginNames = (withSiteUrl.vite.plugins ?? []).map((plugin) => plugin.name)
    const withoutSiteUrlPluginNames = (withoutSiteUrl.vite.plugins ?? []).map((plugin) => plugin.name)

    assert.equal(withSiteUrlPluginNames.at(-1), 'nivel-sitemap-plugin')
    assert.equal(withoutSiteUrlPluginNames.includes('nivel-sitemap-plugin'), false)
  } finally {
    process.chdir(previousCwd)
    fs.rmSync(rootDir, { force: true, recursive: true })
  }
})
