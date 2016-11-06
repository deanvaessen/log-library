/*******************************
 * [_loggerRoot.js]
 * Define the base logger code here
 ******************************/
 /**
 * { Dependencies }
 */

// General helpers
//import mutationHelpers from './mutation';
import helpers from './helpers';
import consoleLogger from './loggers/consoleLogger';
import fileLogger from './loggers/fileLogger';

// helpers libraries
//const fs = require('fs');


/**
 * { Function }
 */
const logger = (function () {

	/**
	* { Main function }
	* Functions to log the message
	*/
		/*
		 * { Primer }
		 * ..
		 */

		const log = (input, callback) => {
			console.log('input');
			console.log(input);

			const messageContent = input.messageContent,
						messageLevel = input.messageLevel,
						messageOutput = input.messageOutput,
						processedPackage = input;

			// Preprocessing
			const messageLengthIsValid = helpers.validate.messageLength(messageContent);

			messageLengthIsValid ? ' ' : helpers.error.throw('Message is too long!');

			const formattedMessage = helpers.format.message(messageContent, messageLevel);

			processedPackage.messageContent = formattedMessage;

			// Talk to a logger based on the output type
			switch (messageOutput) {
				case 'console': {
					consoleLogger.log(formattedMessage, messageLevel, callback);
					break;
				}
				case 'file': {
					// cannot run in the browser, so validate environement
					const environment = helpers.validate.environment();

					environment === 'node' ?
					fileLogger.log(processedPackage, callback) :
					helpers.error.throw('Log to file has to be called processed by Node.JS');

					break;
				}
				case 'stream': {
					// code block for stream log
					break;
				}
				default: {
					//console.log('Sorry, the logger did not recognise this messageOutput');
					callback ? callback('Sorry, the logger did not recognise this messageOutput') : ' ';
					helpers.error.throw('Sorry, the logger did not recognise this messageOutput');
				}
			}
		};

		return {
			log : log
		};
})();

export default logger;

