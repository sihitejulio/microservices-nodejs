const chai = require('chai')

const expect = chai.expect

const { startService } = require('./helpers/test-server')
const { getTracerClient,
  getCacheClient,
  getSqlDBClient,
  getMqClient,
  getMiddleware,
  getApiClient,
  getUtils,
  logger,
  errors
} = require('@apifie/node-microservice')

describe('Before we bootstrap (apifie) our service', () => {
  it('Components are not available before bootstarpping from apifie blueprint', () => {
    expect(getCacheClient, 'Cache client is undefined').to.throw(errors.ComponentError)
    expect(getSqlDBClient, 'DB client is undefined').to.throw(errors.ComponentError)
    expect(getMqClient, 'MQ client is undefined').to.throw(errors.ComponentError)
    expect(getApiClient, 'Api middleware components is undefined').to.throw(errors.ComponentError)
    expect(getMiddleware, 'Routes Middleware components is undefined').to.throw(errors.ComponentError)
    expect(getTracerClient, 'Tracer is undefined').to.throw(errors.ComponentError)
    expect(getUtils, 'Utils is undefined').to.throw(errors.ComponentError)
  })

  it('Logger and error are available without bootstrapping', () => {
    expect(logger, 'logger is available').not.to.be.an('undefined')
    expect(errors, 'MQ is not available').not.to.be.an('undefined')
  })

  describe('When we bootstrap (apifie) our service with our required config', () => {
    it('Our service gets bootstrapped', async() => {
      const testService = await startService()
      return expect(testService, 'Service is not undefined').not.to.be.an('undefined')
    })

    it('After bootstrapping of service, Components are available for use', () => {
      expect(getCacheClient, 'Cache client is not undefined').to.not.throw()
      expect(getSqlDBClient, 'DB client is not undefined').to.not.throw()
      expect(getMqClient, 'MQ client is not undefined').to.not.throw()
      expect(getApiClient, 'Api middleware components is not undefined').to.not.throw()
      expect(getMiddleware, 'Routes Middleware components is not undefined').to.not.throw()
      expect(getTracerClient, 'Tracer is not undefined').to.not.throw()
      expect(getUtils, 'Utils is not undefined').to.not.throw()
    })

    it('Logger and error are available after bootstrapping also', () => {
      expect(logger, 'logger is available').not.to.be.an('undefined')
      expect(errors, 'MQ is not available').not.to.be.an('undefined')
    })
  })
})
