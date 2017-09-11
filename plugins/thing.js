exports.register = (server, options, next) => {
	console.log(`registering plugin thing that requires config plugin to be loaded first`)
	next()
}

exports.register.attributes = {
	name: 'thing',
	version: '1.0.0',
	dependencies: 'config'
}
