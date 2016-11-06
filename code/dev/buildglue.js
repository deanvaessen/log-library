/*******************************
 * [_buildglue.js]
 * Some extra glue for the build process
 ******************************/

console.log('/dev/buildglue.js starting....')

/**
* { Dependencies }
*/

	/*eslint no-console:0 */
	'use strict';

	const ncp = require('ncp').ncp;
	const fs = require('fs');

/**
* { FileSyncing }
*/

	// Copy logger-lib to build folder

	ncp.limit = 16;

	ncp('./src/helpers/logger-lib', './../build/src/', function (err) {
		if (err) {
			return console.error(err);
		}
	});

	// Copy component code and shared helpers/code to protected
	ncp('./src/components/', './../prod/src/components/', function (err) {
		if (err) {
			return console.error(err);
		}
	});

	ncp('./src/stylesupport', './../prod/src/stylesupport', function (err) {
		if (err) {
			return console.error(err);
		}
	});

	fs.createReadStream('./src/helpers/index.js').pipe(fs.createWriteStream('./../prod/src/helpers/index.js'));
	fs.createReadStream('./src/helpers/mutation.js').pipe(fs.createWriteStream('./../prod/src/helpers/mutation.js'));
	fs.createReadStream('./src/helpers/utils.js').pipe(fs.createWriteStream('./../prod/src/helpers/utils.js'));
	fs.createReadStream('./.eslintrc').pipe(fs.createWriteStream('./../prod/.eslintrc'));
	fs.createReadStream('./.eslintrc').pipe(fs.createWriteStream('./../build/.eslintrc'));

console.log('/dev/buildglue.js done!')
