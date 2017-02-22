const packageInfo = require('../package.json')
const agent = require('superagent-promise')(require('superagent'), Promise);
const logger = require('./logger')('nezha-utils')

exports.printLogo = () => {
  console.log()
  console.log('    _   __           __         ')
  console.log('   / | / /__  ____  / /_  _____')
  console.log('  /  |/ / _ \\/_  / / __ \\/ __ `/')
  console.log(' / /|  /  __/ / /_/ / / / /_/ / ')
  console.log('/_/ |_/\\___/ /___/_/ /_/\\__,_/  ')
  console.log()
}

exports.checkUpdate = function* () {
	const baseUrl = `https://registry.cnpmjs.org`
	const fetchPkgRes = yield fetch(`${baseUrl}/nezha-cli`)
	var remotVersion = fetchPkgRes["dist-tags"]["latest"]

	if (packageInfo.version !== remotVersion) {
		logger.warning(`[ Nezha 版本升级提示 ] 最新版本为 ${remotVersion}，本地版本为 ${packageInfo.version}。请尽快升级到最新版本。你可以执行 cnpm install nezha-cli -g 来安装此版本。`)
	} else {
		logger.success("您的版本为最新版")
	}
}

var fetch = function(url){
	return agent('GET', url)
		.end()
		.then(function onResult(res) {
		  return res.body || JSON.parse(res.text)
		}, function onError(err) {
		  throw new Error(err)
		});
}