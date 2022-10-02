# test-runner-browser
[![build status](https://img.shields.io/github/workflow/status/bergos/test-runner-browser/Test)](https://github.com/bergos/test-runner-browser/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/test-runner-browser.svg)](https://www.npmjs.com/package/test-runner-browser)

A CLI tool to build tests for the browser and run them.

## Usage

`test/support/browser.js` is used as the entry point for the bundler to build the tests.
The entry point file must import `mocha` and all tests which should be run in the browser.

Example:

```javascript
import 'mocha'

import '../test1.js'
import '../test2.js'
```

The CLI tool must be run from the main folder of the package to test.
No arguments are required.
A manual run can be triggered with:

`npx test-runner-browser`

Usually, one would add it as a script to the `package.json` like this:

```json
{
  "scripts": {
    "browser-test": "test-runner-browser"
  }
}
```

This allows to run it with:

`npm run browser-test`

### Custom server

If requests to a server API are required, it's possible to host all files on the same server and run the tests from a given URL.

The following folder must be hosted at the root of the server:

- `node_modules/test-runner-browser/public`
- `node_modules/mocha`
- `dist`

The following command will run the tests hosted on `localhost` with port 8080: 

`npx test-runner-browser --url=http://localhost:8080/`
