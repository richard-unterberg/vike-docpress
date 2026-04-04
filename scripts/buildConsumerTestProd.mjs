import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')

const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

const run = (command, args, options = {}) => {
  execFileSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
    ...options,
  })
}

const createTempWorkspace = (nivelVersion) => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'nivel-consumer-test-'))
  const rootPackageJson = readJson(path.join(rootDir, 'package.json'))
  const consumerPackageRoot = path.join(rootDir, 'packages', 'consumer-test')
  const tempConsumerRoot = path.join(tempRoot, 'packages', 'consumer-test')
  const tempConsumerPackageJsonPath = path.join(tempConsumerRoot, 'package.json')

  fs.mkdirSync(path.join(tempRoot, 'packages'), { recursive: true })
  fs.cpSync(consumerPackageRoot, tempConsumerRoot, { recursive: true })
  fs.copyFileSync(path.join(rootDir, 'tsconfig.base.json'), path.join(tempRoot, 'tsconfig.base.json'))
  writeJson(path.join(tempRoot, 'package.json'), {
    name: 'nivel-consumer-test-prod',
    private: true,
    packageManager: rootPackageJson.packageManager,
  })
  fs.writeFileSync(path.join(tempRoot, 'pnpm-workspace.yaml'), 'packages:\n  - packages/consumer-test\n')

  const tempConsumerPackageJson = readJson(tempConsumerPackageJsonPath)
  tempConsumerPackageJson.dependencies = {
    ...tempConsumerPackageJson.dependencies,
    '@unterberg/nivel': nivelVersion,
  }
  writeJson(tempConsumerPackageJsonPath, tempConsumerPackageJson)

  return tempRoot
}

const syncDistToWorkspace = (tempRoot) => {
  const sourceRoot = path.join(tempRoot, 'packages', 'consumer-test', 'dist')
  const targetRoot = path.join(rootDir, 'packages', 'consumer-test', 'dist')

  fs.rmSync(targetRoot, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(targetRoot), { recursive: true })
  fs.cpSync(sourceRoot, targetRoot, { recursive: true })
}

const buildPublishedConsumerTest = (tempRoot) => {
  run('pnpm', ['install'], { cwd: tempRoot })
  run('pnpm', ['--dir', 'packages/consumer-test', 'generate:docs'], { cwd: tempRoot })
  run('pnpm', ['--dir', 'packages/consumer-test', 'exec', 'vike', 'build'], { cwd: tempRoot })
  run('node', ['--import', 'tsx', 'packages/consumer-test/scripts/syncNivelAssets.ts'], { cwd: tempRoot })
  syncDistToWorkspace(tempRoot)
}

const main = () => {
  const nivelPackageJson = readJson(path.join(rootDir, 'packages', 'engine', 'package.json'))
  const tempRoot = createTempWorkspace(nivelPackageJson.version)
  buildPublishedConsumerTest(tempRoot)
}

main()
