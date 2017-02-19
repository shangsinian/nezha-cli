const copy = require('directory-copy');
const inquirer = require('inquirer');
const fs = require('fs');

const REMIND = '已经创建好ejs-page项目，请使用 "npm install" 安装依赖'

module.exports = {
	* run (nezha) {
		const {logger} = nezha
  	const {cwd, boilerplates_path} = nezha.env;

  	let answers = yield inquirer.prompt([{
	    type: 'input',
	    name: 'projectName',
	    message: '请输入ejs-page项目名称'
	  }])
	  
	  if (!answers.projectName) {
	  	logger.error("项目名称不得为空")
	  	return
	  }

	  if (fs.existsSync(answers.projectName)) {
	  	logger.error("项目已存在")
	  	return
	  }

	  const DEST_PATH = cwd + '/' + answers.projectName
	  mkdir('-p', DEST_PATH);
		
		copy({
	    src: __dirname + '/',
	    dest: DEST_PATH,
	    excludes: [ /^\./, /^action\.js/ ]
	  }, function() {
			logger.success(REMIND)
   	})

	}
}