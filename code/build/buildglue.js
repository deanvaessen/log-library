/*******************************
 * [_buildglue.js]
 * Some extra glue for the build process
 ******************************/

console.log('/build/buildglue.js starting....')

/**
* { Dependencies }
*/

	/*eslint no-console:0 */
	'use strict';
	const fs = require('fs');

/**
* { FileSyncing }
*/

	// Copy built logger-lib to prod folder
	fs.createReadStream('./dist/Library.min.js').pipe(fs.createWriteStream('./../prod/src/helpers/logger-lib/index.js'));

console.log('/build/buildglue.js done!')
