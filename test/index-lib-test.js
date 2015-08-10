'use strict';

require( 'should' );

describe( 'Helper (index.js)', function () {
	var config    = require( './config' );
	var helper    = require( '../lib/index' );
	var Sequelize = require( 'sequelize' );
	var testModel = '';

	function clearDatabase ( done ) {
		Sequelize
			.CONNECTION
			.query( 'DELETE FROM "TestData"' )
			.then( function () {
				done();
			} );
	}

	before( function () {
		Sequelize.CONNECTION = new Sequelize( config.database.database, config.database.username, config.database.password, {
			'host'    : config.database.host,
			'port'    : config.database.port,
			'dialect' : 'postgres',
			'logging' : config.database.logging || false
		} );

		Sequelize.CONNECTION.import( 'model/index.js' );

		testModel = require( 'sequelize' ).CONNECTION.model( 'TestData' );
	} );

	describe( 'exported object', function () {

		describe( '-- when required', function () {
			it( 'should return a function', function () {
				( typeof helper ).should.be.equal( 'function' );
			} );
		} );

		describe( '-- when executed with options provided', function () {
			before( function () {
				helper = require( '../lib/index' )( {
					'singularModel' : 'test',
					'sequelize'     : 'sequelize',
					'data'          : 'data'
				} );
			} );

			it( 'should set properties with the options provided', function () {
				helper.singularModel.should.be.equal( 'test' );
				helper.sequelize.should.be.equal( 'sequelize' );
				helper.data.should.be.equal( 'data' );
			} );
		} );

	} );

	describe( '`configure` prototype function', function () {
		describe( '-- when new option is provided', function () {
			before( function () {
				helper.configure( {
					'singularModel' : true,
					'sequelize'     : 'dummySequelize',
					'data'          : 'dummyData'
				} );
			} );

			it( 'should override existing configuration', function () {
				helper.singularModel.should.be.equal( true );
				helper.sequelize.should.be.equal( 'dummySequelize' );
				helper.data.should.be.equal( 'dummyData' );
			} );
		} );

		describe( '-- when no option is provided', function () {
			before( function () {
				helper.configure();
			} );

			it( 'should retain recent configuration', function () {
				helper.singularModel.should.be.equal( true );
				helper.sequelize.should.be.equal( 'dummySequelize' );
				helper.data.should.be.equal( 'dummyData' );
			} );
		} );

		describe( '-- when null option is provided', function () {
			before( function () {
				helper.configure( {
					'singularModel' : null,
					'sequelize'     : null,
					'data'          : null
				} );
			} );

			it( 'should override existing configuration', function () {
				( helper.singularModel === null  ).should.be.equal( true );
				( helper.sequelize === null  ).should.be.equal( true );
				( helper.data === null  ).should.be.equal( true );
			} );
		} );
	} );

	describe( '`add` prototype function', function () {
		describe( '-- when provided with new data', function () {
			var result;

			before( function ( done ) {
				var options = {
					'data' : require( './data' ),
					'done' : done
				};

				helper.configure( {
					'sequelize'     : Sequelize.CONNECTION,
					'singularModel' : false
				} );

				helper.add( options );
			} );

			before( function ( done ) {
				testModel.findAll( {
					'where' : {
						'data' : 'testing data'
					}
				} ).then( function ( doc, err ) {
					if ( err ) {
						result = null;
						return done();
					}

					result = doc;
					done();
				} );
			} );

			after( clearDatabase );

			it( 'should add data to specified table', function () {
				result.length.should.be.equal( 1 );
			} );
		} );

		describe( '-- when no data is provided', function () {
			var result;

			before( function ( done ) {
				helper.configure( {
					'sequelize'     : Sequelize.CONNECTION,
					'singularModel' : false,
					'data'          : require( './data' )
				} );

				helper.add( done );
			} );

			before( function ( done ) {
				testModel.findAll( {
					'where' : {
						'data' : 'testing data'
					}
				} ).then( function ( doc, err ) {
					if ( err ) {
						result = null;
						return done();
					}

					result = doc;
					done();
				} );
			} );

			it( 'should add data from config to specified table', function () {
				result.length.should.be.equal( 1 );
			} );
		} );

	} );

	describe( '`drop` prototype function', function () {
		describe( '-- when only done function is passed', function () {
			var prevData;
			var newData;

			before( function ( done ) {
				testModel
					.findAll()
					.then( function ( doc, err ) {
						if ( err ) {
							prevData = null;
							return done();
						}

						prevData = doc;
						helper.drop( done );
					} );
			} );

			before( function ( done ) {
				testModel
					.findAll()
					.then( function ( doc, err ) {
						if ( err ) {
							newData = null;
							return done();
						}

						newData = doc;
						done();
					} );
			} );

			it( 'should remove data from specified table', function () {
				newData.should.not.be.equal( prevData );
				newData.length.should.be.equal( 0 ).and.not.be.equal( prevData.length );
			} );
		} );

		describe( '-- when option is provided', function () {
			var prevData;
			var newData;
			var options;

			before( function ( done ) {
				options = {
					'data' : require( './data' ),
					'done' : done
				};

				helper.configure( {
					'sequelize'     : Sequelize.CONNECTION,
					'singularModel' : false,
					'data'          : null
				} );

				helper.add( options );
			} );

			before( function ( done ) {
				options = {
					'data' : require( './data' ),
					'done' : done
				};

				testModel
					.findAll()
					.then( function ( doc, err ) {
						if ( err ) {
							prevData = null;
							return done();
						}

						prevData = doc;
						helper.drop( options );
					} );
			} );

			before( function ( done ) {
				testModel
					.findAll()
					.then( function ( doc, err ) {
						if ( err ) {
							newData = null;
							return done();
						}

						newData = doc;
						done();
					} );
			} );

			it( 'should remove data from specified table', function () {
				newData.should.not.be.equal( prevData );
				newData.length.should.be.equal( 0 ).and.not.be.equal( prevData.length );
			} );
		} );

	} );

} );
