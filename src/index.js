const cls = require('cls-hooked')
// const EventEmitter = require('events')

cls.createNamespace('default')

const { serviceSetup, mqListeners } = require('./config/service-setup')
const { logger, serviceBootstrapper } = require('@apifie/node-microservice')

let apifiedApp

async function bootstrapService (app) {
  logger.info('Requesting service bootstrap for your app')

  try {
    apifiedApp = await serviceBootstrapper(serviceSetup, mqListeners, app)
    return apifiedApp
  } catch (err) {
    logger.error('Failed in bootstrapService %s ', err)
    throw err
  }
}

module.exports = {
  bootstrapService
}
