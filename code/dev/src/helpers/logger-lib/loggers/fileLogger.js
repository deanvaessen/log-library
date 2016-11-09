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

					//console.log('A new log file was saved!');
					//console.log(writePath, messageContent);
				});
			};

			// Append to file
			const appendFile = (writePath, messageContent) => {
				fs.appendFile(writePath, messageContent, function (err) {
					if (err) {
						return console.log(err);
					}

					//console.log('The log file was appended!');
					//console.log(writePath, messageContent);
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
					//console.log('I am copying to the logArray: ', fileArray[i]);
				}
			}


			// Define the total
			const logsAmount = logArray.length;

			// Define a base file to verify the size of the mostRecentFile
			let logFileExtention = '.txt',
				//mostRecentArchivedLogPath,
				baseFileName = 'log' + logFileExtention,
				baseLogPath = writePath + baseFileName,
				newlyArchivedLogNumber = logsAmount + 1,
				newlyArchivedLogFileName = 'log' + '.' + newlyArchivedLogNumber + logFileExtention,
				newlyArchivedFileLogPath = writePath + newlyArchivedLogFileName,
				messageWithLineBreak = wrapLineBreak(messageContent);

			// Is there a mostRecentFile or is this the first item?
			if (logsAmount != 0){
				const fileStats = fs.statSync(baseLogPath),
						fileSizeInBytes = fileStats['size'];

				//console.log(fileSizeInBytes, messageInBytes);
				// Is the last log file still within 5000 bytes if I add this new logMessage?
				if (fileSizeInBytes + messageInBytes < 200){
					// Append to file
					appendFile(baseLogPath, messageWithLineBreak);
				} else {
					// Rename the original log file to log.{incrementnumber}
					const mutationStream = fs.createReadStream(baseLogPath);

					mutationStream.pipe(fs.createWriteStream(newlyArchivedFileLogPath));

					let streamHadError = false;

					mutationStream.on('error', function (err) {
						streamHadError = true;
						throw new Error('Log renaming failed! ' + err);
					});

					// Now create a new log file
					mutationStream.on('close', function () {
						if (!streamHadError){
							// Make a new base log file
							writeFile(baseLogPath, messageWithLineBreak);
						}
					});
				}
			} else {
				// Define path for the first file
				writeFile(baseLogPath, messageWithLineBreak);
			}


		// Callback
		let loggedPath = baseLogPath;

		if (loggedPath.charAt(0) === '.'){
			loggedPath = loggedPath.slice(1, loggedPath.length);
		}

		// Define the result for the callback
		loggedPath = messageLocationLookIn + loggedPath;

		const result = {
			messageContent : messageContent,
			writePath : loggedPath
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

