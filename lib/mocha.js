import process from 'process'
import mocha from '../../mocha/mocha.js'

if (typeof window !== 'undefined') {
  window.process = process
  window.mocha = mocha
  mocha.setup('bdd')
}

const describe = mocha.describe || globalThis.describe
const it = mocha.it || globalThis.it
const run = mocha.run || globalThis.run

export {
  mocha as default,
  describe,
  it,
  run
}
