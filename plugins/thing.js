const pkg = require('../package')
exports.plugin = {
  register (server, options) {
    console.log(`registering plugin thing that requires config plugin to be loaded first`)
  },
  name: 'thing',
  version: pkg.version,
  dependency: ['config']
}
