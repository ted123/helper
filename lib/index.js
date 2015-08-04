'use strict';

// Load third party modules
var async      = require( 'async' );
var inflection = require( 'inflection' );

var dbReset   = '';
var loaded    = false;

function DatabaseReset ( options ) {
	options = options || {};

	this.singularModel = options.singularModel;
	this.sequelize     = options.sequelize;
	this.data          = options.data;
}

function checkOptions ( options, self ) {
	var result = {};

	if ( typeof options === 'object' ) {
		result.data = options.data;
		result.done = options.done;
	} else {
		result.data = self.data;
		result.done = options;
	}

	return result;
}

/**
 * Truncate a specific table⁄
 *
 * param  {string}   table
 * param  {function} done
 */
DatabaseReset.prototype.truncate = function ( table, done ) {
	this.sequelize.query( 'TRUNCATE "' +  table + '"' ).then( function () {
		done();
	} );
};

/**
 * Truncate all tables in `data`
 *
 * param  {function} done
 */
DatabaseReset.prototype.drop = function ( options ) {
	var self = this;

	var newOptions = checkOptions( options, self );
	var data       = newOptions.data;
	var done       = newOptions.done;

	async.eachSeries( Object.keys( data ), function ( item, callback ) {
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
DatabaseReset.prototype.bulkCreate = function ( Model, newData, done ) {
	Model.bulkCreate( newData ).then( function () {
		done();
	} );
};

/**
 * Adds all data from `data` into the database
 *
 * param {object} options or {function} options
 */
DatabaseReset.prototype.add = function ( options ) {
	var self = this;

	var newOptions = checkOptions( options, self );
	var data       = newOptions.data;
	var done       = newOptions.done;

	async.eachSeries( Object.keys( data ), function ( item, callback ) {
		var models    = data[ item ].data;
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
 * param {object} options or {function} options
 */
DatabaseReset.prototype.configure = function ( options ) {
	options = options || {};

	if ( 'singularModel' in options ) {
		this.singularModel = options.singularModel;
	}

	if ( 'sequelize' in options ) {
		this.sequelize = options.sequelize;
	}

	if ( 'data' in options ) {
		this.data = options.data;
	}
};

/**
 * Drop and populate tables with data
 *
 * @param {function} done
 */
DatabaseReset.prototype.reset = function ( done ) {
	var self       = this;
	var forceReset = process.env.HARD_RESET || 'true';

	function drop ( callback ) {
		self.drop( callback );
	}

	function add ( callback ) {
		self.add( callback );
	}

	if ( forceReset === 'true' ) {
		async.series( [ drop, add ], done );
	} else {
		done();
	}
};

module.exports = function ( options ) {
	if ( !loaded ) {
		dbReset = new DatabaseReset( options );
		loaded  = true;
	}
	return dbReset;
};
