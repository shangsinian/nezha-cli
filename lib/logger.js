'use strict'

const path = require('path')
const fs = require('fs')
const os = require('os')
const cp = require('child_process')
const debug = require('debug')
const format = require('format')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const moment = require('moment')
const stripAnsi = require('strip-ansi')

class Logger {

  static init () {
    this._start = Date.now()

    process.on('SIGTERM', function () {
      console.log('接收到中断命令 SIGTERM, 即将中止 Nezha')
      process.exit()
    })

    process.on('exit', function () {

    })

  }

  constructor (tag) {
    if (!tag) {
      tag = 'nezha'
    }

    this._tag = tag
    this._debug = debug(tag)
  }

  /**
   * 显示信息, 并记录到日志
   * @return {[type]} [description]
   */
  info () {
    if (!arguments.length) {
      return
    }
    let ctext = format.apply(null, arguments)

    console.log(ctext)
  }

  /**
   * 显示成功信息, 并记录日志
   */
  success () {
    if (!arguments.length) {
      return
    }
    let ctext = format.apply(null, arguments)

    console.log(chalk.green(ctext))
  }

  /**
   * 显示提示信息, 并记录日志
   */
  notice () {
    if (!arguments.length) {
      return
    }
    let ctext = format.apply(null, arguments)
    let ltext = format.apply(null, convertError(arguments))

    console.log(chalk.cyan(ctext))
  }

  /**
   * 显示警告信息, 并记录日志
   */
  warning () {
    if (!arguments.length) {
      return
    }
    let ctext = format.apply(null, arguments)

    console.log(chalk.yellow(ctext))
  }

  /**
   * 显示错误信息, 并记录日志
   */
  error () {
    if (!arguments.length) {
      return
    }
    let ctext = format.apply(null, arguments)

    console.log(chalk.red(ctext))
  }

}

Logger.init()

module.exports = function (tag) {
  return new Logger(tag)
}
module.exports.Logger = Logger
