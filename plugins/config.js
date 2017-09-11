exports.register = (server, options, next) => {
	console.log(`registering the config plugin`)
	server.expose(options)
	next()
}

exports.register.attributes = {
	name: 'config',
	version: '1.0'
}
