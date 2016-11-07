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
	const fs = require('fs'),
		libFile = 'index.js',
		libAtProdDirPath = './../prod/src/helpers/logger-lib/',
		libAtProdFullpath = libAtProdDirPath +libFile;

/**
* { FileSyncing }
*/

	// Copy built logger-lib to prod folder. Check if the folder exists first.
	if (!fs.existsSync(libAtProdDirPath)){
			fs.mkdirSync(libAtProdDirPath);
	}

	fs.createReadStream('./dist/Library.min.js').pipe(fs.createWriteStream(libAtProdFullpath));

console.log('/build/buildglue.js done!')
