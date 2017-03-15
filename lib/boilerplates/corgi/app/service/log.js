const agent = require('superagent-promise')(require('superagent'), Promise)

exports.getLogByMachineId = function* (machineId){
	const {getLogByMachineId} = this.dao.log
	const Res = yield this.db.query(getLogByMachineId(machineId))
	return Res
}