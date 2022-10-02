#!/usr/bin/env node

import { dirname, resolve } from 'path'
import { Command } from 'commander'
import { $ } from 'zx'
import buildVite from '../lib/buildVite.js'

const _dirname = dirname((new URL(import.meta.url)).pathname)
const program = new Command()

program
  .option('-b, --browser <browser>', 'browser', 'chromium')
  .option('-a, --bundler <bundler>', 'bundler', 'vite')
  .option('-c, --config <config>', 'bundler config')
  .option('-u, --url <url>', 'URL')
  .action(async ({ browser, bundler, config, url }) => {
    try {
      const options = {
        browser,
        bundler,
        config,
        url
      }

      if (options.bundler === 'vite') {
        await buildVite(options)
      } else {
        throw new Error(`unknown bundler: ${options.bundler}`)
      }

      process.env.BROWSER = options.browser

      if (options.url) {
        process.env.URL = options.url
      }

      await $`mocha --color --delay ${resolve(_dirname, '../lib/test.js')}`
    } catch (err) {
      process.exit(err.exitCode)
    }
  })
  .parse()
