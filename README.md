# Helper
Database helper function
## Usage
```bash
'use strict';

var lapinMock = require( 'lapin-mock' );
var data      = require( './data/index' );

before( function ( done ) {
	require( '../db' )( done );
} );

function reset ( done ) {
	var options = {
		'sequelize' : require( 'sequelize' ).CONNECTION,
		'data'      : data
	};

	var dbHelper = require( 'helper' )( options ); // initialize helper

	dbHelper.reset( done );
}

function Mock () {}

Mock.prototype.respond = function ( messageType, callback ) {
	this.call = callback;
};

module.exports = {
	'Mock'      : Mock,
	'data'      : data,
	'reset'     : reset,
	'SendMock'  : lapinMock.SendMock,
	'rabbitAPI' : lapinMock.rabbitAPI
};
```

