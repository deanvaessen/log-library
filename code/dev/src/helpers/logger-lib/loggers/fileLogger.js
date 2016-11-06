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

	const log = (input, callback) => {

		// Support functions
			// Function to write file
			const writeFile = (writePath, messageContent) => {
				fs.writeFile(writePath, messageContent, function (err) {
					if (err) {
						return console.log(err);
					}

					console.log('A new log file was saved!');
				});
			};

			// Append to file
			const appendFile = (writePath, messageContent) => {

				// Add a line break based on the OS (encoding is different on UNIX vs Windows)
				if (process.platform === 'win32'){
					messageContent = messageContent + '\r\n';
				} else {
					messageContent = messageContent + '\n';
				}

				fs.appendFile(writePath, messageContent, function (err) {
					if (err) {
						return console.log(err);
					}

					console.log('The log file was appended!');
				});
			};

		// Definitions
		const messageContent = input.messageContent,
					messageLocationLookIn = input.messageLocationLookIn,
					messageLocationPath = input.messageLocationPath + '/',
					messageInBytes = helpers.check.stringInBytes(messageContent);

		let writePath;

			// Define LookIn (path base) and add subpath
			if (messageLocationLookIn == 'driveRoot'){
				writePath = '/';

				if (messageLocationPath != 'undefined'){
					writePath = writePath + messageLocationPath;
				}
			} else if (messageLocationLookIn == 'projectRoot'){
				writePath = './';

				if (messageLocationPath != 'undefined'){
					writePath = writePath + messageLocationPath;
				}
			}

			// Check if the folder exists
			if (!fs.existsSync(writePath)){
					fs.mkdirSync(writePath);
			}

			// Add a name to the logFile
				// First an inventory check, get a list of the current log files
				let fileArray = fs.readdirSync(writePath),
					logArray = [];

				// Remove any files that might not be log files
				fileArray.forEach(function (fileName, arrayIndex) {

					if (fileName.includes('log')){
						logArray.push(fileName);
						console.log('I am copying to the logArray: ', fileName);
					};
				});


				console.log('logArray:');
				console.log(logArray);

				// Define the total
				const logsAmount = logArray.length;

				// Define a base file to verify the size of the mostRecentFile
				let logFileExtention = '.txt',
					newLogNumber = logsAmount + 1,
					baseFileName = 'log' + logFileExtention,
					mostRecentFilePath,
					newLogFileName;

				// Check file size of mostRecentFile and define a name for the new log
				if (logArray.length === 0) {
					newLogNumber = '';
					newLogFileName = baseFileName;
				} else if (logArray.length === 1){
					baseFileName = 'log' + logFileExtention;
					newLogFileName = 'log' + '.' + newLogNumber + logFileExtention;
					mostRecentFilePath = writePath + baseFileName;
				} else {
					baseFileName = 'log' + '.' + logsAmount + logFileExtention;
					newLogFileName = 'log' + '.' + newLogNumber + logFileExtention;
					mostRecentFilePath = writePath + baseFileName;
				}

				// Is there a mostRecentFile or is this the first item?
				console.log('aaaaaaaaaaa');
				console.log(mostRecentFilePath);

				if (logsAmount != 0){
					const fileStats = fs.statSync(mostRecentFilePath),
							fileSizeInBytes = fileStats['size'];

					console.log(fileSizeInBytes, messageInBytes);
					// Is the last log file still within 5000 bytes if I add this new logMessage?
					if (fileSizeInBytes + messageInBytes < 5000){
						// Append to file
						writePath = writePath + newLogFileName;
						console.log(newLogFileName);
						console.log(newLogFileName);

						appendFile(mostRecentFilePath, messageContent);
					} else {
						// Write a new file
						writePath = writePath + newLogFileName;

						writeFile(writePath, messageContent);
					}
				} else {
					// Define path for the first file
					writePath = writePath + newLogFileName;

					writeFile(writePath, messageContent);
				}

		// Callback
		callback ? callback(messageContent) : ' ';
	};

	return {
		log : log
	};
 })();


 /**
	* Export
	*/
 module.exports = index;

