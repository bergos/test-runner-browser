import { dirname, resolve } from 'path'
import express from 'express'

const _dirname = dirname((new URL(import.meta.url)).pathname)

async function server (callback) {
  const app = express()

  app.use(express.static(resolve(_dirname, '../public')))
  app.use(express.static(resolve('../node_modules/mocha/')))
  app.use(express.static('dist'))

  const server = await new Promise((resolve, reject) => {
    const server = app.listen(async err => {
      if (err) {
        reject(err)
      } else {
        resolve(server)
      }
    })
  })

  const close = async () => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  const url = `http://localhost:${server.address().port}/`

  try {
    await callback(url)
  } catch (err) {
    await close()

    throw err
  }

  await close()
}

export default server
