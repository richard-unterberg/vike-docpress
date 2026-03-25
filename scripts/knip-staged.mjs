import { spawnSync } from 'node:child_process'
import { access, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const repoRoot = process.cwd()
const stagedFiles = [...new Set(process.argv.slice(2).map(normalizeToPosixPath))]

const existingFiles = []

for (const filePath of stagedFiles) {
  const absolutePath = path.resolve(repoRoot, filePath)

  try {
    await access(absolutePath)
    existingFiles.push(filePath)
  } catch {
    // Ignore deleted files and paths outside the current checkout.
  }
}

if (existingFiles.length === 0) {
  process.exit(0)
}

const baseConfigPath = path.join(repoRoot, 'knip.json')
const baseConfig = JSON.parse(await readFile(baseConfigPath, 'utf8'))
const tempConfigPath = path.join(repoRoot, `.knip-staged-${process.pid}-${Date.now()}.json`)

const tempConfig = {
  ...baseConfig,
  ignore: [...(baseConfig.ignore ?? []), ...existingFiles.map((filePath) => `!${filePath}`)],
}

await writeFile(tempConfigPath, `${JSON.stringify(tempConfig, null, 2)}\n`)

let exitCode = 1

try {
  const result = spawnSync('pnpm', ['exec', 'knip', '--config', tempConfigPath, '--no-progress', '--no-config-hints'], {
    cwd: repoRoot,
    stdio: 'inherit',
  })

  if (result.error) {
    throw result.error
  }

  exitCode = result.status ?? 1
} finally {
  await rm(tempConfigPath, { force: true })
}

process.exit(exitCode)

function normalizeToPosixPath(filePath) {
  return filePath.split(path.sep).join(path.posix.sep)
}
