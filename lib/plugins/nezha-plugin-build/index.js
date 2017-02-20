"use strict";

const inquirer = require('inquirer');
const connect = require('connect');
const fs = require("fs")
const webpack = require('webpack');
var _static = require('serve-static');
var gutil = require('gulp-util');

var path = require('path');
var ejspageWebpackConfigFile = require('./configs/webpack.ejspage.conf.js')

var webpackConfigFile = {
  ejspage: ejspageWebpackConfigFile
}

const exec = function* (nezha) {

  const {logger} = nezha
  var resolve = path.resolve;

  let answers = yield inquirer.prompt([{
    type: 'list',
    name: 'devType',
    message: '请选构建模式',
    choices: [
      'ejspage'
    ]
  }])
  
  var webpackConfigs = webpackConfigFile[answers.devType]({
    assets_path: __dirname + '/assets/',
    cwd: nezha.env.cwd,
    nezha_path: nezha.env.home
  });

  rm('-rf', nezha.env.cwd+'/build');
  logger.warning("清理构建目录")

  webpack(webpackConfigs, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));

    logger.success('构建完成');
    process.exit();
  });
  
  var pageInfo = require(`${nezha.env.cwd}/nz-page.json`)

  mkdir("-p", `${nezha.env.cwd}/build/page/${pageInfo.name}`);
  cp(nezha.env.cwd+'/index.ejs', `${nezha.env.cwd}/build/page/${pageInfo.name}/index.ejs`)
  logger.success(`build页面`)
  var index_ejs_file = fs.readFileSync(nezha.env.cwd+'/index.ejs', 'utf-8')
  var includeRegex = /\<\%-?\s*include\s(\S+)\s*\-\%\>/gm;
  let modNameRegex = /mod\/(\S+)\/index\.ejs/gm
  var matchRes = index_ejs_file.match(includeRegex)

  yield* matchRes.map(function* (match){
    try{
      let mod_relative_path = match.split(" ")[2]
      var matchRes = mod_relative_path.match(modNameRegex)
      let modName = matchRes[0].split("/")[1]
      let mod_absolute_path = path.resolve(mod_relative_path)
      let mod_build_path = `${nezha.env.cwd}/build/mod/${modName}`
      mkdir("-p", mod_build_path)
      cp(mod_absolute_path, `${nezha.env.cwd}/build/mod/${modName}/index.ejs`)
      logger.success(`build模块 ${modName}`)
    }catch(e) {
      logger.error(e)
    }
  })


}

module.exports = {
  name: 'build',
  description: '构建工具',
  exec: exec
}