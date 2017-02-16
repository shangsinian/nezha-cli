var path = require('path')
var fs = require('fs')

class PluginManager {
	constructor (env) {
		this.plugins_path = env.plugins_path
		this.plugins = []
		this._load()
	}

	_load (){
		let {plugins_path, plugins} = this
		let pluginsFile = fs.readdirSync(this.plugins_path);
		
 		pluginsFile.forEach(function(name) {
      var pluginPath = plugins_path + '/' + name;  
      plugins.push(pluginPath)
    });
	}
}

module.exports = PluginManager