'use strict'

const Commander = require('./commander')
const Context = require('./context')
const Environment = require('./environment')
const PluginManager = require('./plugin_manager')
const utils = require('./utils')
const logger = require('./logger')('nezha')

class Nezha {
  constructor () {
    // public props
    this.logger = logger
    this.env = new Environment()
    this.pm = new PluginManager(this.env)
    this.printLogo = utils.printLogo
    this.commander = new Commander(this.pm.plugins, this)
  }

  get plugins () {
    return this.pm.plugins
  }

  get commands () {
    return this.commander.commands
  }

  * run () {
    let ctx = new Context(process.cwd(), this)
    yield this.commander.run(ctx)
  }

}

module.exports = Nezha
