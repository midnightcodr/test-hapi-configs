const pkg = require('../package')
exports.plugin = {
  register: (server, options) => {
    console.log(`registering the config plugin`)
    server.expose(options)
  },
  name: 'config',
  version: pkg.version
}
