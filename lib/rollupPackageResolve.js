import { readFile } from 'node:fs/promises'
import { dirname } from 'node:path'

async function readPackageJson (base) {
  try {
    const filename = `${base}/package.json`
    const raw = await readFile(filename)
    const json = JSON.parse(raw.toString())

    return json
  } catch (err) {
    return {}
  }
}

function resolve (name, base) {
  if (!base || !name.startsWith('.')) {
    return name
  }

  return (new URL(name, `file://${base}`)).pathname
}

function resolveEntries (entries, entriesResolved, base, context) {
  for (const [from, to] of Object.entries(entries)) {
    entriesResolved[resolve(from, base, context)] = resolve(to, base, context)
  }
}

function rollupPackageResolve (entries = {}) {
  const entriesResolved = {}

  return {
    name: 'rollup-package-resolve',
    enforce: 'pre',
    async buildStart () {
      const base = `${dirname((await this.resolve('.')).id)}/`
      const packageJson = await readPackageJson(base)

      resolveEntries(entries, entriesResolved, base)

      if (packageJson && packageJson.browser) {
        resolveEntries(packageJson.browser, entriesResolved, base)
      }
    },
    async resolveId (source, importer, options) {
      const pathname = resolve(source, importer)

      if (!entriesResolved[pathname]) {
        return await this.resolve(source, importer, { skipSelf: true, ...options })
      }

      return entriesResolved[pathname]
    }
  }
}

export default rollupPackageResolve
