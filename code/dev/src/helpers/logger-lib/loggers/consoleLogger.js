/*******************************
 * [_consoleLogger.js]
 * Define the consoleLogger function
 ******************************/

/**
 * { Dependencies }
 */
import helpers from './../helpers';

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Log }
	 * Log it with console.log
	*/

	const log = (messageContent, messageLevel, callback) => {

		const result = {
			messageContent : messageContent
		};

		// Add colours
		const styledMessageContent = '%c' + messageContent;

		switch (messageLevel) {
			case 'debug':
				console.debug(styledMessageContent, 'color: grey');

				callback ? callback(result) : ' ';
				break;
			case 'info':
				console.info(styledMessageContent, 'color: green');

				callback ? callback(result) : ' ';
				break;
			case 'error':
				console.error(styledMessageContent, 'color: red');

				callback ? callback(result) : ' ';
				break;
			default:
				//console.log('Sorry, the logger did not recognise this messageLevel for the console.log messageOutput');

				callback ? callback('Sorry, the logger did not recognise this messageLevel in the console.log messageOutput type') : ' ';
				helpers.error.throw('Sorry, the logger did not recognise this messageLevel in the console.log messageOutput type');
			}
	};

	return {
		log : log
	};
 })();


 /**
	* Export
	*/
 module.exports = index;
