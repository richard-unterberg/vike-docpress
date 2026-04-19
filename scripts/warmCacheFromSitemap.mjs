const siteUrl = process.env.SITE_URL?.trim()
const warmConcurrency = Number.parseInt(process.env.CACHE_WARM_CONCURRENCY?.trim() ?? '4', 10)

const fail = (message) => {
  console.error(message)
  process.exit(1)
}

if (!siteUrl) {
  fail('Missing SITE_URL.')
}

if (!Number.isFinite(warmConcurrency) || warmConcurrency < 1) {
  fail('CACHE_WARM_CONCURRENCY must be a positive integer.')
}

const normalizeUrl = (value) => {
  const url = new URL(value)
  url.hash = ''
  return url.toString()
}

const readTextResponse = async (response, label) => {
  const text = await response.text()

  if (!response.ok) {
    fail(`Cache warm request failed for ${label} with ${response.status} ${response.statusText}: ${text}`)
  }

  return text
}

const extractSitemapUrls = (xml) => {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizeUrl(match[1]))
}

const warmUrl = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
  })

  await readTextResponse(response, url)
  console.log(`Warmed ${url}`)
}

const warmUrls = async (urls) => {
  let currentIndex = 0

  const worker = async () => {
    while (currentIndex < urls.length) {
      const index = currentIndex
      currentIndex += 1
      await warmUrl(urls[index])
    }
  }

  await Promise.all(Array.from({ length: Math.min(warmConcurrency, urls.length) }, () => worker()))
}

const sitemapUrl = new URL('/sitemap.xml', siteUrl).toString()
console.log(`Fetching sitemap from ${sitemapUrl}`)

const sitemapResponse = await fetch(sitemapUrl, {
  method: 'GET',
  redirect: 'follow',
})

const sitemapXml = await readTextResponse(sitemapResponse, sitemapUrl)
const sitemapUrls = extractSitemapUrls(sitemapXml)
const urlsToWarm = Array.from(new Set([normalizeUrl(siteUrl), ...sitemapUrls]))

if (urlsToWarm.length === 0) {
  fail(`No URLs found in sitemap ${sitemapUrl}.`)
}

console.log(`Warming ${urlsToWarm.length} URL(s) with concurrency ${Math.min(warmConcurrency, urlsToWarm.length)}.`)
await warmUrls(urlsToWarm)
