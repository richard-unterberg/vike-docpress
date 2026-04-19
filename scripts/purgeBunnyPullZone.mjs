const apiKey = process.env.BUNNY_API_KEY?.trim()
const pullZoneId = process.env.BUNNY_PULL_ZONE_ID?.trim()

const fail = (message) => {
  console.error(message)
  process.exit(1)
}

const readResponsePayload = async (response) => {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return await response.json()
  }

  return await response.text()
}

if (!apiKey) {
  fail('Missing BUNNY_API_KEY.')
}

if (!pullZoneId) {
  fail('Missing BUNNY_PULL_ZONE_ID.')
}

const runPullZonePurge = async () => {
  const requestUrl = `https://api.bunny.net/pullzone/${encodeURIComponent(pullZoneId)}/purgeCache`
  console.log(`Calling Bunny purge endpoint for pull zone ${pullZoneId}.`)

  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      AccessKey: apiKey,
    },
  })

  const payload = await readResponsePayload(response)

  if (!response.ok) {
    fail(
      `Bunny pull-zone purge failed with ${response.status} ${response.statusText}: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}`,
    )
  }

  console.log(`Bunny purge response status: ${response.status} ${response.statusText}`)
  console.log(`Bunny purge response payload: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}`)
}

await runPullZonePurge()
