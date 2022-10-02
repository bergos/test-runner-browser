import { dirname, resolve } from 'path'
import { $ } from 'zx'

const _dirname = dirname((new URL(import.meta.url)).pathname)

async function buildVite ({ config } = {}) {
  config = config || resolve(_dirname, 'support/vite.config.js')

  await $`vite build --config=${config} --sourcemap`
}

export default buildVite
