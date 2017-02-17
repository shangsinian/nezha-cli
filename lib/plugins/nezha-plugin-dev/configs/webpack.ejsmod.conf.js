var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = function({assets_path, cwd}){
	var config = {
		context: cwd+'/',
  	entry: {
  		index: './src/index.js',
  	},
  	output: {
      // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
      path: '/build',
      filename: '[name].js',
      publicPath: '/'
    },
  	externals: {
  		'jQuery': 'window.jQuery',
  		'$': 'window.Zepto'
  	},
  	module: {
      rules: [
        {
          test: /\.less$/,
          use:  ['style-loader','css-loader',"less-loader"]
        }
      ]
    },
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
			  filename: 'index.html',
			  template: cwd+'/index.ejs',
			  inject: true,
        use: ExtractTextPlugin.extract({
          use: "ejs-loader",
          publicPath: "/"
        })
			})
		]
	}

	return config
}