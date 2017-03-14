"use strict";

const inquirer = require('inquirer');
const connect = require('connect');
const fs = require("fs")
const webpack = require('webpack');
var _static = require('serve-static');
var gutil = require('gulp-util');

var path = require('path');
var ejspageWebpackConfigFile = require('./configs/webpack.ejspage.conf.js')
var antdvaWebpackConfigFile = require('./configs/webpack.ant-dva.conf.js')

var webpackConfigFile = {
  ejspage: ejspageWebpackConfigFile,
  antdva: antdvaWebpackConfigFile
}

const exec = function* (nezha) {

  const {logger} = nezha
  var resolve = path.resolve;

  let answers = yield inquirer.prompt([{
    type: 'list',
    name: 'devType',
    message: '请选构建模式',
    choices: [
      'ejspage',
      'antdva'
    ]
  }])
  
  var webpackConfigs = yield webpackConfigFile[answers.devType]({
    assets_path: __dirname + '/assets/',
    cwd: nezha.env.cwd,
    nezha_path: nezha.env.home,
    nezha: nezha
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
  var pageInfo = require(`${nezha.env.cwd}/nz.json`)
  mkdir("-p", `${nezha.env.cwd}/build/page/${pageInfo.name}`);


}

module.exports = {
  name: 'build',
  description: '构建工具',
  exec: exec
}