/* global describe, it, run */

import assert from 'assert'

function reportSuites (suites) {
  for (const suite of suites) {
    describe(suite.label, () => {
      reportSuites(suite.suites)

      for (const test of suite.tests) {
        it(test.label, () => {
          assert(!test.fail)
        })
      }
    })
  }
}

function report (suites) {
  reportSuites(suites)
  run()
}

export default report
