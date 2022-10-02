/* global mocha */

async function collect () {
  const suites = []

  await new Promise(resolve => {
    let current = { suites }
    const stack = [suites]
    const runner = mocha.run(resolve)

    runner.on('suite', suite => {
      const instance = {
        label: suite.title,
        suites: [],
        tests: []
      }

      stack.push(current)
      current.suites.push(instance)
      current = instance
    })

    runner.on('suite end', () => {
      current = stack.pop()
    })

    runner.on('fail', (test, error) => {
      current.tests.push({
        label: test.title,
        fail: true,
        error
      })
    })

    runner.on('pass', test => {
      current.tests.push({
        label: test.title,
        fail: false,
        error: null
      })
    })
  })

  return suites
}

export default collect
