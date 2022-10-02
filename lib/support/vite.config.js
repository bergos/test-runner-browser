import { defineConfig } from 'vite'
import rollupPackageResolve from '../rollupPackageResolve.js'

export default defineConfig({
  resolve: {
    alias: {
      mocha: './node_modules/test-runner-browser/lib/mocha.js'
    }
  },
  build: {
    lib: {
      entry: './test/support/browser.js',
      fileName: 'tests.vite',
      formats: ['es']
    },
    target: 'es2020'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  plugins: [
    rollupPackageResolve()
  ]
})
