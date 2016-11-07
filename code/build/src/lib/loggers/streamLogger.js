/*******************************
 * [_consoleLogger.js]
 * Define the consoleLogger function
 ******************************/

/**
 * { Dependencies }
 */
	const Readable = require('stream').Readable;

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Log }
	 * Log it to a sourceStream via a pipe action
	*/

	// Stream Logger
	const log = (input, callback) => {

		// Support functions
			// sparkles


		// Definitions
		const messageContent = input.messageContent;
		const messageSourceStream = input.messageSourceStream;


			// Set up the read stream
			let readStream = new Readable;

			// Push & Pipe
			readStream.push(messageContent);
			readStream.push(null);
			readStream.pipe(messageSourceStream);

		// Callback
		const result = {
			messageContent : messageContent
		};

		callback ? callback(result) : ' ';
	};

	return {
		log : log
	};
 })();


 /**
* Export
*/
 module.exports = index;

