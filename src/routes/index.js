const { logger } = require('@apifie/node-microservice')
const fs = require('fs')
const path = require('path')
const Joi = require('joi')

const basename = path.basename(__filename)

const routeSchema = Joi.object().keys({
  path: Joi.string().required(),
  method: Joi.string().required().valid('get', 'post', 'put', 'delete').insensitive(),
  handler: Joi.func().required(),
  config: Joi.object().required()
})

function addPathToRouter (route, router) {
  Joi.validate(route, routeSchema, (err) => {
    if (err) {
      logger.warn('Not a valid path object %s', err)
      return false
    }
    logger.info('Added Path for %s -- %s', route.method, route.path)
    router[route.method.toLowerCase()](route.path, route.handler).describe(route.config)
  })
}

const routeCollection = (router) => {
  try {
    logger.info('Adding application Routes....... Start')
    fs.readdirSync(__dirname).filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')).forEach((file) => {
      const routeCollection = path.join(__dirname, file)
      if (Array.isArray(routeCollection)) {
        routeCollection.map((route) => {
          addPathToRouter(route, router)
        })
      } else if (typeof (routeCollection) === 'object') {
        addPathToRouter(routeCollection, router)
      }
    })
    logger.info('Added application Routes..... Done')
    return router
  } catch (e) {
    logger.error('Please fix issues in application Routes...', e)
  }
}

module.exports = {
  routeCollection
}
