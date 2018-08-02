const Hapi = require('hapi')
const config = require(`./${process.env.NODE_ENV || 'qa'}.json`)

const server = new Hapi.Server({
  host: 'localhost',
  port: 8888,
  app: config
})

// this is wrong, don't do it like this
// server.app = config
// do server.app.key1 = 'value1', for example, instead

server.app.otherAttr = 'other value'

const initServer = async () => {
  await server.register([{
    plugin: require('./plugins/config'),
    options: config
  }, {
    plugin: require('./plugins/thing')
  }])

  console.log('all plugins are registered')

  // static config
  // should return { "something": "..." }
  server.route({
    method: 'GET',
    path: '/server/settings',
    handler (request) {
      return request.server.settings.app
    }
  })

  // runtime config
  // should return {"otherAttr":"other value"}
  server.route({
    method: 'GET',
    path: '/server/app',
    handler (request) {
      return request.server.app
    }
  })

  // config via plugin
  // should return same result as /server/settings
  server.route({
    method: 'GET',
    path: '/server/config',
    handler (request) {
      return request.server.plugins.config
    }
  })

  await server.start()
  console.log(`server started at ${server.info.uri}`)
}

initServer()
