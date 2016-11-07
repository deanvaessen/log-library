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
import streamLogger from './loggers/streamLogger';

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
			console.log(typeof input);

			const messageContent = input.messageContent,
						messageLevel = input.messageLevel,
						messageOutput = input.messageOutput,
						processedPackage = input;

			// Preprocessing
			const messageLengthIsValid = helpers.validate.messageLength(messageContent);

			messageLengthIsValid ? ' ' : helpers.error.throw('Message is too long!');

			const formattedMessage = helpers.format.message(messageContent, messageLevel);

			processedPackage.messageContent = formattedMessage;

			console.log('heyyy');
			// Talk to a logger based on the output type
			switch (messageOutput) {
				case 'console': {
					// code block for console logging
					consoleLogger.log(formattedMessage, messageLevel, callback);
					break;
				}
				case 'file': {
					// code block for file logging
					// cannot run in the browser, so validate environement
					const environment = helpers.validate.environment();

					environment === 'node' ?
					fileLogger.log(processedPackage, callback) :
					helpers.error.throw('Log to file has to be called processed by Node.JS');

					break;
				}
				case 'stream': {
					// code block for stream logging
					console.log('passing a stream');
					streamLogger.log(processedPackage, callback);
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

