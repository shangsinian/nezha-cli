const copy = require('directory-copy');

const REMIND = '已经创建好Nodejs后端项目，请使用 "npm install" 安装依赖'

module.exports = {
	run: function(nezha) {
		const {logger} = nezha
  	const {cwd, boilerplates_path} = nezha.env;
		
		copy({
	    src: __dirname + '/',
	    dest: cwd,
	    excludes: [ /^\./, /^action\.js/ ]
	  }, function() {
	    logger.success(REMIND)
	  }).on('log', function(msg, level) {
	    logger.success(level + ': ' + msg)
	  })
	}
}