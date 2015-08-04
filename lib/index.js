'use strict';

// Load third party modules
var async      = require( 'async' );
var inflection = require( 'inflection' );

var helper    = '';
var loaded    = false;

function Helper ( options ) {
	this.singularModel = options.singularModel;
	this.sequelize     = options.sequelize;
	this.data          = options.data;
}

/**
 * Truncate a specific table⁄
 *
 * @param  {string}   table
 * @param  {function} done
 */
Helper.prototype.truncate = function ( table, done ) {
	this.sequelize.query( 'TRUNCATE "' +  table + '"' ).then( function ( data ) {
		done();
	} );
};

/**
 * Truncate all tables in `data`
 *
 * @param  {function} done
 */
Helper.prototype.drop = function ( done ) {
	var self = this;

	async.eachSeries( Object.keys( self.data ), function ( item, callback ) {
		var tableName = inflection.camelize( item );
		self.truncate( tableName, callback );
	}, done );
};

/**
 * Saves test data from `data` to the database using Model.bulkCreate
 *
 *  param {Model}   Model,
 *  param {[object]} data
 *  param {function} done
 */
Helper.prototype.bulkCreate = function ( Model, newData, done ) {
	Model.bulkCreate( newData ).then( function () {
		done();
	} );
};

/**
 * Adds all data from `data` into the database
 *
 * @param {function} done
 */
Helper.prototype.add = function ( done ) {
	var self = this;
	async.eachSeries( Object.keys( self.data ), function ( item, callback ) {
		var models    = self.data[ item ].data;
		var modelName = '';

		if ( self.singularModel ) {
			modelName = inflection.camelize( inflection.singularize( item ) );
		} else {
			modelName = inflection.camelize( item );
		}

		var Model = self.sequelize.model( modelName );

		self.bulkCreate( Model, models, callback );
	}, done );
};

/**
 * Override existing options with the provided options
 *
 * @param {object} options
 */
Helper.prototype.configure = function ( options ) {
	this.singularModel = options.singularModel || this.singularModel;
	this.sequelize     = options.sequelize || this.sequelize;
	this.data          = options.data || this.sequelize;
};

/**
 * Drop and populate tables with data
 *
 * @param {function} done
 */
Helper.prototype.reset = function ( done ) {
	var self = this

	function drop ( done ) {
		self.drop( done );
	}

	function add ( done ) {
		self.add( done );
	}

	if ( !process.env.HARD_RESET ) {
		async.series( [ drop, add ], done );
	} else {
		done();
	}
};

module.exports = function ( options ) {
	if ( !loaded ) {
		helper = new Helper( options );
		loaded = true;
	}
	return helper;
};
