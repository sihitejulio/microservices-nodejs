const packageJson = require('../package.json')
const Joi = require('joi')
const path = require('path')
const processTestMessage = require('./../test-message-processor')

const name = packageJson.name
const version = packageJson.version

const serviceSetup = {
  env: process.env.NODE_ENV,
  runIntegrationTests: process.env.RUN_INTEGRATION_TESTS,
  microserviceName: name,
  microserviceVersion: version,
  cache: {
    enabled: true,
    redisKey: process.env.REDIS_KEY,
    redisPort: process.env.REDIS_PORT,
    redisHost: process.env.REDIS_HOST,
    redisKeyPrefix: `${name}-${version}`,
    redisKeyTimeout: 24 * 60 * 60 // In Seconds
  },
  mq: {
    enabled: true,
    rabbitmqUser: process.env.RABBITMQ_USER,
    rabbitmqPwd: process.env.RABBITMQ_PWD,
    rabbitmqHost: process.env.RABBITMQ_HOST,
    rabbitmqPort: process.env.RABBITMQ_PORT,
    messageQueueHeartbeat: 60, // In seconds
    exchangesToSubscribe: [
      {
        name: `${name}-${version}`,
        keys: [`notify-${name}`]
      }
    ]
  },
  log: {
    enabled: true,
    logstashHost: process.env.LOGSTASH_HOST,
    logstashPort: process.env.LOGSTASH_PORT,
    logLevel: process.env.LOG_LEVEL || 'info'
  },
  trace: {
    enabled: true,
    transactionIdHeaderKey: 'x-transactionid',
    zipkinHost: process.env.ZIPKIN_HOST,
    zipkinPort: process.env.ZIPKIN_PORT
  },
  db: {
    enabled: true,
    modelsPath: path.join(__dirname, '../../test/models'),
    crtFilePath: path.join(__dirname, '../../test/config/db.crt.pem'),
    mysqlMicroserviceUrl: process.env.MYSQL_MICROSERVICE_URL,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    }
  },
  api: {
    enabled: true,
    API_TIMEOUT: 60 * 1000, // In miliseconds
    API_MAX_RETRIES: 1
  }
}

// Setup for MQ Listeners
const mqListeners = {
  TEST_MESSAGE: {
    specification: Joi.object().keys({
      event: Joi.string().min(1).required(),
      metadata: Joi.object().keys({
        appKey: Joi.string().min(1).required(),
        appContext: Joi.string().min(1).required()
      }),
      data: Joi.object().required()
    }),
    listener: processTestMessage
  }
}

module.exports = {
  serviceSetup,
  mqListeners
}
