'use strict';

var env = process.env;

var config = {
	'database' : {
		'host'     : 'postgres',
		'port'     : 5432,
		'database' : 'HelperTestDatabase',
		'username' : env.POSTGRES_USERNAME || 'postgres',
		'password' : env.POSTGRES_PASSWORD || 'password'
	}
};

module.exports = config;
