"use strict";

const inquirer = require('inquirer');

const exec = function* (nezha) {
  const {boilerplates_path} = nezha.env;

  nezha.printLogo()
  //当前工作目录

  let answers = yield inquirer.prompt([{
    type: 'list',
    name: 'project',
    message: '请选择初始项目',
    choices: [
      'ejs-mod',
      'corgi',
      'tauri-admin',
    ]
  }])

  const action = require(`${boilerplates_path}/${answers.project}/action`)
  yield action.run(nezha)
}

module.exports = {
  name: 'init',
  description: '项目初始化',
  exec: exec
}
