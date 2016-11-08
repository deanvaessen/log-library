/*******************************
 * [_helpers.js]
 * Define the main helpers for the logging
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Check }
	 * Support helpers to well...check things.
	*/
	const check = {
		stringInBytes : function (str) {
			// returns the byte length of an utf8 string
			let s = str.length;

			for (let i = str.length - 1; i >= 0; i--) {
				const code = str.charCodeAt(i);

				if (code > 0x7f && code <= 0x7ff) s++;
				else if (code > 0x7ff && code <= 0xffff) s += 2;
				if (code >= 0xDC00 && code <= 0xDFFF) i--; // trail surrogate
			}
			return s;
		}
	};

	/**
	 * { Define }
	 * Support helpers to define elements such as date, time.
	*/
	const define = {
		// Adding a 0 in front of single characters looks better in the log.
		prependZeroForSingles : function (item) {
			if (item.length === 1) {
				return ('0' + item.toString());
			}
			return item;
		},

		date : function () {

			const currentDate = new Date();

			let day = define.prependZeroForSingles(currentDate.getDate().toString()),     // Get current date
						month = define.prependZeroForSingles((currentDate.getMonth() + 1).toString()),  // Current month
						year = currentDate.getFullYear();


			const dateString = day + '/' + month + '/' + year;

			return dateString;
		},

		time : function () {
			// Adding a 0 in front of single characters looks better in the log..
			const currentTime = new Date();

			let hour = define.prependZeroForSingles(currentTime.getHours().toString()),
				min = define.prependZeroForSingles(currentTime.getMinutes().toString()),
				sec = define.prependZeroForSingles(currentTime.getSeconds().toString());

			const timeString = hour + ':' + min + ':' + sec;

			return timeString;
		}
	};

	/**
	 * { Validate }
	 * Support helpers to validate things such as message length and the environment
	*/
	const validate = {
		messageLength : function (messageContent) {

			// Prevent numbers from causing errors, convert to string.
			if (typeof messageContent === 'number') {
				messageContent = messageContent.toString();
			}


			const messageLength = messageContent.length;

			// Return true (valid) if the length is <= 1000
			return messageLength <= 1000 == true;
		},

		environment : function () {
			//Check if it is running in node.js or the browser
			const isBrowser = function () {
				try {
					return this === window;
				} catch (e) {
					return false;
				}
			};

			const isNode = function () {
				if (process.versions.node != 'undefined'){
					return true;
				}

				return false;
			};

			if (isBrowser()) {
				return 'browser';
			} else if (isNode()) {
				return 'node';
			};
		}
	};

	/**
	 * { Format }
	 * Support helpers to format the message
	*/
	const format = {
		message : function (messageContent, messageLevel) {
			const timeAndDate = define.date() + ' - ' + define.time();

			// Format #{LogTime} [#{LogLevel}] #{LogMessage}
			let formattedMessage;

			formattedMessage = '#' + '{' + timeAndDate + '}' + ' ';
			formattedMessage = formattedMessage + '[' + '#' + '{' + messageLevel + '}' + ']' + ' ';
			formattedMessage = formattedMessage + '#' + '{' + messageContent + '}';

			return formattedMessage;
		},

		filterSpecificFirstChar : function (input, charFilter) {
			if (input.charAt(0) === charFilter){
				input = input.slice(1, input.length);
			}
			return input;
		},

		filterSpecificLastChar : function (input, charFilter) {
			if (input.charAt(input.length - 1) === charFilter){
				input = input.slice(0, input.length - 1);
			}
			return input;
		}
	};

	/**
	 * { Errors }
	 * Support helpers for error handling
	*/
	const error = {
		throw : function (message) {
			throw message;
		}
	};

	return {
		check : check,
		define : define,
		validate : validate,
		format : format,
		error : error
	};
 })();


 /**
	* Export
	*/
 module.exports = index;
