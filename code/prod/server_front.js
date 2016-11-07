/*******************************
 * [_server_front.js]
 * Front-end dev server
 ******************************/

/**
* { Dependencies }
*/

/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');

	// WebPack
	const webpack = require('webpack');
	const WebpackDevServer = require('webpack-dev-server');
	const config = require('./webpack.config');
	const open = require('open');

/**
* { Webpack }
*/

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, 'localhost', (err) => {
	if (err) {
		console.log(err);
	}
	console.log('Listening at localhost:' + config.port);
	console.log('Opening your system browser...');
	open('http://localhost:' + config.port + '/webpack-dev-server/');
});
