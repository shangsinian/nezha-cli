'use strict'

module.exports = function(app,middleware,control){
	app.get('/api/log/:machineid', control.log.getLogByMachineId)
}

