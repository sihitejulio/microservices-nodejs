
// const { swagger } = require('./index.js')
// use this swagger instance if u want to add the schema, parameter, and references

module.exports = [{
  path: '/testingRoute',
  method: 'post',
  handler: (request, reply) => {
    if (request) { reply.json({ name: 'testingRoute post' }) }
  },
  config: {
    tags: ['testing'],
    responses: {
      200: {
        description: 'Returns example'
      }
    }
  }
}, {
  path: '/testingRoute',
  method: 'get',
  handler: (request, reply) => {
    if (request) { reply.json({ name: 'testingRoute' }) }
  },
  config: {
    tags: ['testing'],
    responses: {
      200: {
        description: 'Returns example 1'
      }
    }
  }
}, {
  path: '/testingRoute',
  method: 'put',
  handler: (request, reply) => {
    if (request) { reply.json({ name: 'testingRoute put' }) }
  },
  config: {
    tags: ['testing'],
    responses: {
      200: {
        description: 'Returns example 1'
      }
    }
  }
},
{
  path: '/testingRoute',
  method: 'delete',
  handler: (request, reply) => {
    if (request) { reply.json({ name: 'testingRoute put' }) }
  },
  config: {
    tags: ['testing'],
    responses: {
      200: {
        description: 'Returns example 1'
      }
    }
  }
}]
