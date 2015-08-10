'use strict';

var config = require( '../test/config' );

module.exports = {

	'test' : {
		'username' : config.database.username,
		'password' : config.database.password,
		'database' : config.database.database,
		'host'     : config.database.host,
		'dialect'  : 'postgres'
	}

};
