/*******************************
 * [_consoleLogger.js]
 * Define the consoleLogger function
 ******************************/

/**
 * { Dependencies }
 */
	import helpers from './../helpers';
	const fs = require('fs');
	const path = require('path');

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Log }
	 * Log a file with fs
	*/

	const log = (input, callback) => {

		// Support functions

			// Linebreak
			const wrapLineBreak = (input) => {
				// Add a line break based on the OS (encoding is different on UNIX vs Windows)
				if (process.platform === 'win32'){
					return input + '\r\n';
				}

				return input + '\n';
			};

			// Function to write file
			const writeFile = (writePath, messageContent) => {
				fs.writeFile(writePath, messageContent, function (err) {
					if (err) {
						return console.log(err);
					}

					console.log('A new log file was saved!!');
				});
			};

			// Append to file
			const appendFile = (writePath, messageContent) => {
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
				messageInBytes = helpers.check.stringInBytes(messageContent);

		let writePath,
			messageLocationPath;

		if (input.messageLocationPath) {
			messageLocationPath = input.messageLocationPath + '/';
		} else {
			messageLocationPath = '';
		}

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
			//let fileArray = fs.readdirSync(writePath, ['**.txt']),

			let fileArray = fs.readdirSync(writePath),
				logArray = [];

			// Take only files that are log files
			for (let i in fileArray) {
				if (path.extname(fileArray[i]) === '.txt' && fileArray[i].includes('log')) {
					logArray.push(fileArray[i]);
					console.log('I am copying to the logArray: ', fileArray[i]);
				}
			}


			console.log('logArra22y:');
			console.log(logArray);

			// Define the total
			const logsAmount = logArray.length;

			// Define a base file to verify the size of the mostRecentFile
			let logFileExtention = '.txt',
				newLogNumber = logsAmount + 1,
				baseFileName = 'log' + logFileExtention,
				mostRecentFilePath,
				newLogFileName,
				messageWithLineBreak = wrapLineBreak(messageContent);

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

					writePath = mostRecentFilePath;
					appendFile(writePath, messageWithLineBreak);
				} else {
					// Write a new file
					writePath = writePath + newLogFileName;

					writeFile(writePath, messageWithLineBreak);
				}
			} else {
				// Define path for the first file
				writePath = writePath + newLogFileName;

				writeFile(writePath, messageWithLineBreak);
			}

		// Callback
		if (writePath.charAt(0) === '.'){
			writePath = writePath.slice(1, writePath.length);
		}

		const result = {
			messageContent : messageContent,
			writePath : messageLocationLookIn + writePath
		};

		console.log(result.writePath);
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
