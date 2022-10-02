#!/usr/bin/env node

import report from './report.js'
import run from './run.js'
import server from './server.js'

async function test () {
  const options = {
    browser: process.env.BROWSER,
    url: process.env.URL
  }

  try {
    if (options.url) {
      const results = await run(options)

      report(results)
    } else {
      await server(async url => {
        const results = await run({
          ...options,
          url
        })

        report(results)
      })
    }
  } catch (err) {
    console.error(err)
  }
}

test()
