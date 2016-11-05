/*******************************
 * [_consoleLogger.js]
 * Define the consoleLogger function
 ******************************/

/**
 * { Dependencies }
 */
	import helpers from './../helpers';
	const fs = require('fs');

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Log }
	 * Log it with console.log
	*/

	const log = (messageContent, messageLevel, callback) => {

		// Function to write file
		const writeFile = (messageContent) => {

			fs.writeFile('/tmp/test', 'Hey there!', function (err) {
				if (err) {
					return console.log(err);
				}

				console.log('The file was saved!');
			});
		};


		switch (messageLevel) {
			case 'debug':
				writeFile(messageContent);
				callback ? callback(messageContent) : ' ';
				break;
			case 'info':
				writeFile(messageContent);
				callback ? callback(messageContent) : ' ';
				break;
			case 'error':
				writeFile(messageContent);
				callback ? callback(messageContent) : ' ';
				break;
			default:
				callback ? callback('Sorry, the logger did not recognise this messageLevel in the fileLogger messageOutput') : ' ';
				helpers.error.throw('Sorry, the logger did not recognise this messageLevel in the fileLogger messageOutput type');
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

