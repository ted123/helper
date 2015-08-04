'use strict';

module.exports = {
	'up' : function ( migration, DataTypes, done ) {
		migration.createTable( 'TestData', {
			'id' : {
				'type'       : DataTypes.STRING,
				'primaryKey' : true
			},

			'data'      : DataTypes.STRING,
			'createdAt' : DataTypes.DATE,
			'updatedAt' : DataTypes.DATE,
			'deletedAt' : DataTypes.DATE
		} ).then( function () {
			done();
		} );
	},

	'down' : function ( migration, DataTypes, done ) {
		migration.dropTable( 'TestTable' ).then( function () {
			done();
		} );
	}
};
