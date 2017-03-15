const mysql = require('promise-mysql');
const dbCfg = require('../../config/db')

const pool = mysql.createPool(dbCfg);


module.exports = function* (next) {
	this.db = pool
	yield next;
} 