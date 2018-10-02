const cls = require('cls-hooked')

const namespace = cls.createNamespace('default')

const { bootstrapService } = require('../../../src')
const { getExpressApp } = require('./test-app')
const chai = require('chai')

let server
let app
console.log('namespace ', namespace.get('default'))

function setChai () {
  console.log('Setting Chai keys')
  chai.config.proxyExcludedKeys.push('eventually')
  chai.config.proxyExcludedKeys.push('rejected')
}

async function startServer () {
  console.log('Starting test app')
  const res = getExpressApp()
  // console.log('Inside start server ', res)
  server = res.server
  return res.app
}

async function stopServer () {
  console.log('Stopping test app')
  app = undefined
  if (server) {
    console.log('Shutting down test server')
    try {
      await server.close(() => {
        console.log('Test server is shut down now')
      })
    } catch (err) {
      console.log('error in shutting down the test server %s', err)
    }
  }
}

async function startService () {
  try {
    const testService = await bootstrapService(app)
    return testService
  } catch (err) {
    console.log('Some error in starting test service %j ', err)
    throw err
  }
}

before(async () => {
  console.log('In before test')
  setChai()
  app = await startServer()
  console.log('Got test express app in before ')
})

after(async () => {
  console.log('In after test')
  await stopServer()
})

module.exports = {
  startService
}
