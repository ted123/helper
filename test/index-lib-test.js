'use strict';

require( 'should' );

describe( 'Helper (index.js)', function () {
	var helper = require( '../lib/index' )
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
		before( function () {
			helper.configure( {
				'singularModel' : true,
				'sequelize'     : 'dummySequelize',
				'data'          : 'dummyData'
			} );
		} );

		it( 'should override existing options if new option is provided', function () {
			helper.singularModel.should.be.equal( true );
			helper.sequelize.should.be.equal( 'dummySequelize' );
			helper.data.should.be.equal( 'dummyData' );
		} );
	} );

} );
