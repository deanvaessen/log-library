/*******************************
 * [_server_back.js]
 * Back-end dev server
 ******************************/

/**
* { Dependencies }
*/

/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');

	// Express
	const express = require('express')
	const app = express()

		// bodyParser
		import bodyParser from 'body-parser';

	// Logger
	import logger from './src/helpers/logger-lib/loggerRoot';

/**
* { Express }
* Small test server for streaming and writing to files through Node.JS
*/
	/**
	 * Config
	 */
		 app.use(bodyParser.urlencoded({
		     extended: true,
		     limit: '50mb'
		 }));

		 app.use(bodyParser.json({
		 	limit: '50mb'
		 }));

		 app.use(function(req, res, next) {

		   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		   res.header("Access-Control-Allow-Origin", "http://localhost:8000");
		   next();
		 });

	 /**
	  * Routes
	  */
		app.post('/api/log/create', (req, res, next) => {
			let payload = req.body;

			logger.log(payload, function(loggedItem){
				res.json(loggedItem);
				next();
			});
		});

	app.listen(8001)
