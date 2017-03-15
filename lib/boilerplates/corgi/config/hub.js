module.exports = [
	{
		name: 'Car',
		id: 'com.simpocar.service.car',
		type: 'http',
		host: 'com.simpocar.service.car',
		port: 9099,
	},
	{
		name: 'Deal',
		id: 'com.alaccar.service.deal',
		type: 'thrift',
		host: 'com.simpocar.service.deal',
		port: 9098,
		thriftFile: require('../thrift/gen-nodejs/DealService.js')
	}
]