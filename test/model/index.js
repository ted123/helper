'use strict';

module.exports = function ( sequelize, DataTypes ) {

	sequelize.define( 'TestData', {

		'id' : {
			'type'       : DataTypes.STRING,
			'primaryKey' : true
		},

		'data' : DataTypes.STRING,

		'createdAt' : DataTypes.DATE,
		'updatedAt' : DataTypes.DATE,
		'deletedAt' : DataTypes.DATE

	} );

};
