const Hapi = require('hapi')
const config = require(`./${process.env.NODE_ENV||'qa'}.json`)

const server = new Hapi.Server({
	app: config
})

server.app = config 

server.register([{
	register: require('./plugins/config'),
	options: config
}, {
	register: require('./plugins/thing')
}], (err) => {
	if(err) {
		throw err
	}
	console.log('all plugins are loaded')
})
server.connection({
	host: 'localhost',
	port: 8888
})

// static config
server.route({
	method: 'GET',
	path: '/server/settings',
	handler: (request, reply) => {
		reply(request.server.settings.app)
	}
})

// runtime config
server.route({
	method: 'GET',
	path: '/server/app',
	handler: (request, reply) => {
		reply(request.server.app)
	}
})

// config via plugin
server.route({
	method: 'GET',
	path: '/server/config',
	handler: (request, reply) => {
		reply(request.server.plugins.config)
	}
})

server.start( () => {
	console.log(`server started at ${server.info.uri}`)
} )
