'use strict';

function getByAttribute ( attribute, value ) {
	/*jshint validthis:true */

	var conditions = {};

	conditions[ attribute ] = value;

	return _.find( this, conditions );
}

var data = [
	{
		'id'   : 'test' + ( new Date ) / 1,
		'data' : 'testing data'
	},
	{
		'id'   : 'test1' + ( new Date ) / 1,
		'data' : 'testing'
	}
];

module.exports = {
	'TestData' : {
		'getByAttribute' : getByAttribute.bind( data ),
		'data'           : data
	}
};
