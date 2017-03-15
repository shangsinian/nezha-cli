const squel = require("squel")
const moment = require("moment")

exports.getLogByMachineId = function(machineid){
	return squel.select()
		.from('machine_log')
			.where('machine_id=? and type=?', machineid, "PER")
			.order("gmt_creat",false)
			.limit(1)
		.toString()
}