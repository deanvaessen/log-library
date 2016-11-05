/*******************************
 * [_logger.js]
 * Define the logger code here
 ******************************/
 /**
 * { Dependencies }
 */

// General helpers
//import mutationHelpers from './mutation';
import loggersupport from './loggersupport';
import consoleLogger from './consoleLogger';

// Support libraries
//const fs = require('fs');


/**
 * { Function }
 */
const logger = (function () {


/*	let result = {
		english : {
			value : null
		}
	};*/

	/**
	* { Main function }
	* Functions to log the message
	*/
		/*
		 * { Primer }
		 * ..
		 */

		const log = (input, callback) => {

			//const messageContent = input.logMessage.value;

			console.log('You got me!');
			console.log(input);

			const messageContent = input.messageContent,
						messageLevel = input.messageLevel,
						messageOutput = input.messageOutput;

			// Preprocessing
			const messageLengthIsValid = loggersupport.validate.messageLength(messageContent);

			messageLengthIsValid ? ' ' : loggersupport.error.throw('Message is too long!');

			const formattedMessage = loggersupport.format.message(messageContent, messageLevel);

			switch (messageOutput) {
				case 'console': {
					// code block for console.log
					consoleLogger.log(formattedMessage, messageLevel, callback);
					break;
				}
				case 'file': {
					// code block for file log
					// cannot run in the browser, so validate environement also
					const environment = loggersupport.validate.environment();

					environment === 'node' ? this.file(formattedMessage) : loggersupport.error.throw('wrong environment!');
					break;
				}
				case 'stream': {
					// code block for stream log
					break;
				}
				default: {
					//console.log('Sorry, the logger did not recognise this messageOutput');
					callback ? callback('Sorry, the logger did not recognise this messageOutput') : ' ';
					loggersupport.error.throw('Sorry, the logger did not recognise this messageOutput');
				}
			}



/*				const file = (formattedMessage) => {

			fs.writeFile("/tmp/test", "Hey there!", function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("The file was saved!");
				});
			};*/
		};

		return {
			log : log
		};
})();

export default logger;

