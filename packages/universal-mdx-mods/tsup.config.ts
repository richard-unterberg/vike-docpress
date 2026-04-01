import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  tsconfig: './tsconfig.build.json',
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: ['react', 'react-dom'],
})
