/* ******************************
 * [userActions.js]
 * This file holds the communication calls for the component to test stream and file logging through NodeJS/Express.
 *
 * Notes:
 *
 ******************************/

/**
* Dependencies
*/

import {ajax} from './../../helpers/utils.js';
import logger from './../../helpers/logger-lib/root';

/**
 * Object
 */

let exposed = new class {

	postLog(input, callback) {
		console.log('communicator_postLog: Fire');

		const messageOutput = input.messageOutput;

		switch (messageOutput) {
			case 'console': {
				// code block for console.log
				logger.log(input, callback);

				break;
			}
			case 'file': {
				// send an AJAX  request to the backend to test the fileLogger
				ajax.post('http://localhost:8001/api/log/create', input, function (response) {
					console.log('communicator_postLog: Finished');
					console.log(response);
					callback(response);
				}, true, 'JSON');

				break;
			}
			case 'stream': {
				// code block for stream log
				break;
			}
			default: {
				//console.log('Sorry, the logger did not recognise this messageOutput');
				callback ? callback('Sorry, the logger did not recognise this messageOutput') : ' ';
				throw new Error('Sorry, the logger did not recognise this messageOutput');
			}
		}

	}
};

/**
 * Export
 */
module.exports = exposed;
