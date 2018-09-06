#!/usr/bin/env node
const express = require('express')
const { makeApifiedApp } = require('../test-app')
const debug = require('debug')('node-app:server')
const http = require('http')

console.log('Starting app from node express folder')
let app = express()
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)
server.on('error', onError)
server.on('listening', onListening)
server.listen(port, async () => {
  await startBlueprint()
})

async function startBlueprint () {
  try {
    app = await makeApifiedApp(app)
    console.log('Your app is apified.Ready to use')
    console.log('****************************************************************')
  } catch (err) {
    console.log('App startup failed. Shutting down server')
    try {
      server.close(() => {
        process.exit(1)
      })
    } catch (err) {
      console.log('error in shutting down the server %s', err)
    }
  }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      /* eslint-disable */
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1)
      break
    /* eslint-enable */
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
