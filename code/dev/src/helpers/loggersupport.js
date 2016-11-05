/*******************************
 * [_loggersupport.js]
 * Define the main helper for the logging
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Define }
	 * Support helpers to define elements such as date, time.
	*/
	const define = {
		date : function () {
			const currentDate = new Date(),
						day = currentDate.getDate(),     // Get current date
						month = currentDate.getMonth() + 1, // current month
						year = currentDate.getFullYear(),
						dateString = day + '/' + month + '/' + year;

				return dateString;
		},

		time : function () {
			const currentTime = new Date(),
					hour = currentTime.getHours(),
					min = currentTime.getMinutes(),
					sec = currentTime.getSeconds(),
					timeString = hour + ':' + min + ':' + sec;

			return timeString;
		}
	};

	/**
	 * { Validate }
	 * Support helpers to validate things such as message length and the environment
	*/
	const validate = {
		messageLength : function (messageContent) {
			console.log(typeof messageContent);

			// Prevent numbers from causing errors, convert to string.
			if (typeof messageContent === 'number') {
				messageContent = messageContent.toString();
			}


			const messageLength = messageContent.length;

			// Return true (valid) if the  length is <= 1000
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
				try {
					return this === global;
				} catch (e) {
					return false;
				}
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
			formattedMessage = formattedMessage + '[' + '#' + messageLevel + '}' + ']' + ' ';
			formattedMessage = formattedMessage + '#' + '{' + messageContent + '}';

			return formattedMessage;
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
