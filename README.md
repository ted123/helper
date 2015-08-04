#Helper
Database helper function
##Usage
###Initializing helper function:

```javascript
var dbHelper = require( 'helper' )();
```
or

```javascript
var dbHelper = require( 'helper' )( options );
```
###Available options:

```singularModel``` - A boolean that determines whether to singularize model name or not.

```sequelize```     - Variable that contains the sequelize connection to be used.

```data```          - The data to be used in database table manipulation. ( Refer [here](https://github.com/ted123/helper/blob/test/test/data/index.js) for data format )

###Available functions:

####drop
Empty table contents.

- Parameters:

	<b>```options```</b> - Can be a callback function or an object containing callback function and data to be used.

- Sample Code:

	```javascript
function callback () {
	//do something
}
var dbHelper = require( 'helper' )( options );
dbHelper.drop(callback)
	```
or

	```javascript
var newOptions = {
	'data' : someData
	'done' : soneCallback
}
var dbHelper = require( 'helper' )( options );
dbHelper.drop(newOptions);
	```


####add
Save all data to table.

- Parameters:

	<b>```options```</b> - Can be a callback function or an object containing callback function and data to be used.

- Sample Code:

	```javascript
function callback () {
	//do something
}
var dbHelper = require( 'helper' )( options );
dbHelper.add(callback)
	```
	or

	```javascript
var newOptions = {
	'data' : someData
	'done' : soneCallback
}
var dbHelper = require( 'helper' )( options );
dbHelper.add(newOptions);
	```

####truncate
Truncate specified table.

- Parameters:

	<b>```table```</b> - Table name.

	<b>```callback```</b> - Callback function.

- Sample Code:

	```javascript
function callback () {
	//do something
}
var dbHelper = require( 'helper' )( options );
dbHelper.truncate( 'TestTable', callback )
	```

####bulkCreate
Save data in bulk.

- Parameters:

	<b>```Model```</b> - Sequelize model.

	<b>```newData```</b> - Data to be saved.

	<b>```done```</b> - Callback function.

- Sample Code:

	```javascript
function callback () {
	//do something
}
var dbHelper = require( 'helper' )( options );
dbHelper.bulkCreate( sequelizeModel, newData ,callback )
	```

####configure
Override exisiting options.

- Parameters:

	<b>```options```</b> - Object containing new options.

- Sample Code:

	```javascript
var dbHelper = require( 'helper' )();
dbHelper.configure( {
	'singularModel' : false,
	'sequelize'     : newSequelizeConnection,
	'data'          : newData
} );
	```

####reset
Empty database table and repopulate it with data.

- Parameters:

	<b>```done```</b> - Callback function.

- Sample Code:

	```javascript
function done () {
	// do something
}
var dbHelper = require( 'helper' )();
dbHelper.reset( done );
	```

###Other Features

- Disable reset function when running test by setting environement variable HARD_RESET to false

	```javascript
HARD_RESET=false npm test
	```

###Example Usage

```javascript
'use strict';

function reset ( done ) {
	var options = {
		'sequelize' : require( 'sequelize' ).CONNECTION,
		'data'      : data
	};

	var dbHelper = require( 'helper' )( options ); // initialize helper

	dbHelper.reset( done );
}

module.exports = {
	'reset' : reset
};
```

###Running Unit Test

- Create database `HelperTestDatabase`

- Use migration script found in scripts folder. ( Ex. ```./scripts/migrate.sh``` )

- Use ```npm test``` to run linting and unit test
