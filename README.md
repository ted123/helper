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

####```drop``` 
- Empty table contents.

#####Parameters:

<b>```options```</b> - Can be a callback function or an object containing callback function and data to be used.

#####Sample Code:

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


####```add``` 
- Save all data to table.

#####Parameters:

<b>```options```</b> - Can be a callback function or an object containing callback function and data to be used.

#####Sample Code:

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
####```truncate``` 
- Truncate specified table.

#####Parameters:

<b>```table```</b> - Table name.

<b>```callback```</b> - Callback function.

#####Sample Code:

```javascript
function callback () {
	//do something
}
var dbHelper = require( 'helper' )( options );
dbHelper.truncate( 'TestTable', callback )
```

