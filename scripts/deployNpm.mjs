import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')

const run = (command, args) => {
  execFileSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  })
}

const main = () => {
  run('pnpm', ['--filter', '@unterberg/nivel', 'build'])
  run('pnpm', ['--dir', 'packages/engine', 'publish', '--access', 'public', '--no-git-checks'])
  run('node', ['./scripts/buildConsumerTestProd.mjs'])
}

main()
