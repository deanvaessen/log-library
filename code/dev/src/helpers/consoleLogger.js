/*******************************
 * [_consoleLogger.js]
 * Define the consoleLogger function
 ******************************/

/**
 * { Dependencies }
 */
import loggersupport from './loggersupport';

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Log }
	 * Log it with console.log
	*/

	const log = (messageContent, messageLevel, callback) => {

		// Add colours
		const styledMessageContent = '%c' + messageContent;

		switch (messageLevel) {
			case 'debug':
				console.debug(styledMessageContent, 'color: grey');

				callback ? callback(messageContent) : ' ';

				break;
			case 'info':
				console.info(styledMessageContent, 'color: green');

				callback ? callback(messageContent) : ' ';

				break;
			case 'error':
				console.error(styledMessageContent, 'color: red');

				callback ? callback(messageContent) : ' ';

/*				if (callback){
					callback(messageContent);
				};*/

				break;
			default:
				//console.log('Sorry, the logger did not recognise this messageLevel for the console.log messageOutput');

				callback ? callback('Sorry, the logger did not recognise this messageLevel for the console.log messageOutput') : ' ';
				loggersupport.error.throw('Sorry, the logger did not recognise this messageLevel for the console.log messageOutput');
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
