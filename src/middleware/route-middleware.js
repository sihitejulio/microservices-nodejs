const { logger, router } = require('@apifie/node-microservice')

// const routeEntryFilePath = '../routes/index.js'
const { routeCollection } = require('../routes/index.js')

const routeMiddleware = async(app) => {
  try {
    logger.debug('adding routes middleware')
    const routes = await routeCollection(router)
    app.use('/', routes)
  } catch (err) {
    logger.error('Failed to run routes.. %s ', err)
    throw err
  }
}

module.exports = {
  routeMiddleware
}
