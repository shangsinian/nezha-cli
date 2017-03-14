var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var qs = require('qs');

var data = "hahaha"

var babelQuery = {
  cacheDirectory: true,
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0')
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-typecheck'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    [
      require.resolve('babel-plugin-import'),
      {
        "libraryName": "antd",
        "style": true,   // or 'css' 
      }
    ]
  ]
};

module.exports = function({assets_path, cwd, nezha_path, nezha}){
  let nezha_root_path = path.resolve(nezha_path, "..")

	var config = {
		context: nezha_root_path,
  	entry: {
  		index: cwd+'/src/scripts/index.js',
  	},
  	output: {
      // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
      path: cwd+'/build',
      filename: 'js/[name].js',
      publicPath: '/'
    },
  	externals: {
  		'jQuery': 'window.jQuery',
  		'$': 'window.Zepto'
  	},
  	module: {
      rules: [{
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?/i,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
        },
        {
          test: /\.css$/,
          use:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize' })
        },
        {
          test: /\.less$/,
          use:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?-convertValues!less-loader' })
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: babelQuery
        },
      ]
    },
		plugins: [
			new ExtractTextPlugin({ 
        filename: 'css/[name].css', 
        disable: false, 
        allChunks: true
      })
		]
	}

	return config
}