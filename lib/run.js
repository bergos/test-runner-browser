import { chromium } from 'playwright'
import collect from './collect.js'

async function run ({ browser, url }) {
  let app = null

  try {
    if (browser === 'chromium') {
      app = await chromium.launch({ headless: true })
    } else {
      throw new Error(`unknown browser: ${browser}`)
    }

    const page = await app.newPage()

    await page.goto(url, { waitUntil: 'domcontentloaded' })

    const results = await page.evaluate(`${collect.toString()}()`)

    await app.close()

    return results
  } catch (err) {
    if (app) {
      await app.close()
    }

    throw err
  }
}

export default run
