'use strict'

class Context {
  constructor (cwd, nezha) {

    // runtime props
    this.cwd = cwd
    this.cmd = null
    // access props
    this.nezha = nezha
    this.pm = nezha.pm
    this.env = nezha.env
  }

  * runCommand (command, args, opts) {
    let cmd = command.fullNames().join(' ')

    // set cmd
    this.cmd = cmd

    let ret = command.action.call(this, args, opts)
    yield ret
  }

}

module.exports = Context
