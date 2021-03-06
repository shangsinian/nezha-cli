'use strict'

const program = require("co-mmander")
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const config = require('../package.json');
const logger = require('./logger')('nezha')

class Commander {
  constructor (plugins, nezha) {
  	this.nezha = nezha
  	this.program = program
  	this._load(plugins)
  }

  _load(plugins) {
  	let {program, nezha} = this

  	plugins.forEach( plugin_path => {
      try {
        //加载command命令
        var command = require( plugin_path + '/index.js');
        
        program
        .command(command.name)
        .description(command.description)
        .action(function* (cmd,options){
        	yield command.exec(nezha);
        });
      } catch (e) {
        console.error(e.message,'error');
      }
		    
  	})
  }

  * run () {
  	let {program} = this
	
    program
    .version(config.version)
    .usage('<command> [options]')
    .on('--help', function() {
      logger.info('  Examples:',true);
      console.log();
      console.log(chalk.blue('    $ nezha init ') );
      console.log();
    });

    yield new Promise((resolve, reject) => {
      program.parse(process.argv)
      resolve()
    })
  }
}

module.exports = Commander