'use strict'

module.exports = function(app,control,middleware){
	app.get('/api/log/:machineid', control.log.getLogByMachineId)
}

