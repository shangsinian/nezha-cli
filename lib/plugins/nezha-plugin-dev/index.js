"use strict";

const inquirer = require('inquirer');
const connect = require('connect');
const webpack = require('webpack');
var _static = require('serve-static');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var path = require('path');
var ejsmodWebpackConfigFile = require('./configs/webpack.ejsmod.conf.js')
var ejspageWebpackConfigFile = require('./configs/webpack.ejspage.conf.js')

var webpackConfigFile = {
  ejsmod: ejsmodWebpackConfigFile,
  ejspage: ejspageWebpackConfigFile
}

const exec = function* (nezha) {

  const {logger} = nezha
  var resolve = path.resolve;
  var server_path = resolve(nezha.env.cwd + '/__build');

  let answers = yield inquirer.prompt([{
    type: 'list',
    name: 'devType',
    message: '请选择调试模式',
    choices: [
      'ejsmod',
      'ejspage',
      'corgi',
      'tauri-admin',
    ]
  }])
  
  var webpackConfigs = webpackConfigFile[answers.devType]({
    assets_path: __dirname + '/assets/',
    cwd: nezha.env.cwd,
    nezha_path: nezha.env.home
  });

  var publicPath = 'http://localhost:' + 8081;
  var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


  var server = connect();

  // server.use('/favicon.ico', function (req, res) {
  //   res.end('');
  // });
  var compiler = webpack(webpackConfigs);

  server.use(webpackDevMiddleware(compiler, {
    contentBase: webpackConfigs.output.path,
    publicPath: webpackConfigs.output.publicPath,
    hot: true,
    stats: {
      cached: true,
      colors: true
    },
    historyApiFallback: true
  }));

  server.use(_static(server_path, {
    maxage: 0
  }));

  server.listen(8081, function () {
    logger.success("调试模式已启动 请访问 http://127.0.0.1:8081 查看预览效果")
  });

}

module.exports = {
  name: 'dev',
  description: '开发调试工具',
  exec: exec
}