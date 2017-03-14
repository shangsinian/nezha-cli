const copy = require('directory-copy');
const inquirer = require('inquirer');
const fs = require('fs');

const REMIND = '已经创建好Nodejs后端项目，请使用 "npm install" 安装依赖'

module.exports = {
	* run (nezha) {
		const {logger} = nezha
  	const {cwd, boilerplates_path} = nezha.env;


	  const DEST_PATH = cwd + '/'
		
		copy({
	    src: __dirname + '/',
	    dest: DEST_PATH,
	    excludes: [ /^\./, /^action\.js/ ]
	  }, function() {
			logger.success(REMIND)
   	})

	}
}