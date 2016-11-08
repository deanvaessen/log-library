# log-library + SDK

![Screenshot of the front-end component](/meta/screenshot.png?raw=true "Front-end component screenshot")

<br /><br />
## Intro
------
##### Library
* The minified version of the library is found in /build/dist.
* The source code of the library is found in /dev/helpers/logger-lib/.

<br />
#### Features:
There are three different message levels:
* debug
* info
* error 

<br />
There are three output types:
* console logger: logs to the console
* file logger: logs to a file
* stream logger: logs to any stream

<br />
The console logger throws an exception if the log message is longer than 1000 characters. 
<br />
The console logger sets the color of the text depending on the message level:
* debug - gray
* info - green
* error - red

<br />
The file logger rotates the files by size. If a logfile reaches the size of 5k, a new log file is generated.
The new filename changes to name #{LogFileName}.#NextNumber.#{LogFileExtension} and logging continues in the new file.
E.g.: original log name is: log.txt. The first new file would be log.1.txt, the second rotation creates the log.2.txt file.

<br />
Every log output type uses the same log formatting: #{LogTime} [#{LogLevel}] #{LogMessage}.

<br />
Library is packaged, minified and waiting in build/dist.

<br />
##### Build environment / SDK
* I left in my own build environment, which served as a sort of 'SDK' for the  library and helped me build and test it properly.
* It includes a front-end component (React), as well as a small back-end to test file logging (built on NodeJS + Express). 
* Logging files through the browser instead of Node is iffy. So I chose logging through Node. Hence the back-end.
* Sub-folders starting point were boilerplates.
<br />

##### Front-end
* Front-end component is served with Webpack/Babel/esLint.
* Front-end was built to debug and test the library properly as a third party component. 
* Providing me hooks to throw things at the library as such, made development easier.

<br /><br />
## Details
------
### Docs
* Changelog in meta/changelog

<br />
### Library dependencies
* NodeJS
* FS
* Path
* NCP

<br />
### Directory Structure
The folders below are controlled by the package.json file in the project/code folder. Where necessary, they have in their own folder a buildglue.js file with extra build commands to tie them together.

* dev - Holds the development folder. This holds the frontend component (src/components/TestBed) to test the library and the library sourcecode (src/helpers/logger-lib).
* build - Holds the build process folder. Each time the dev folder is updated, 'ncp' pumps the library's dev sourcecode to build, and builds the package (thanks nodemon).
* prod - Similar to dev folder, except with built and minified library to import the library and see if it works. Component code and lib code are both synced by 'ncp'/'fs'.

<br /><br />
## API reference
------
#### 0. Set up the component and the message:

```sh
import logger from 'yourlocationofthelogger';

const logMessage = 'Hello world!',
    logLevel = 'info', // or 'debug' or 'error'
    logOutputType = 'console'; // or 'file' or 'stream'
    
const newLogMessage = {
	messageContent : logMessage,
	messageLevel : logLevel,
	messageOutput : logOutputType
};
```

<br />
#### 1. Add extra fields if necessary:
##### File-logging:

```sh
// Add specific extras that correspond to the different output types
	// If you want to log to a file, set a lookIn directory:
	newLogMessage.messageLocationLookIn = 'driveRoot';
		
	// OR
		
	newLogMessage.messageLocationLookIn = 'projectRoot';

// You may also set a subpath:
	// You can either add backslashes here or not add them (e.g. /abc), the library can handle both
	const somefolder = 'abc';
	
	newLogMessage.messageLocationPath = somefolder;
```

<br />
##### Stream-logging:
```sh
// If you want to log to a stream, add a writable stream as input:
const somestream = yourwriteablestream;
newLogMessage.messageSourceStream = somestream;
```

<br />
#### 2. Now send it
```sh
logger.postLog(newLogMessage, (result) => {
	// do something with the returned log (result)
});
```
<br />
### Gotchas:
* Mind the fact that file logging can only be done through nodeJS. So if you want to log something to a file from the frontend, you will need to have a backend setup and pass the message to a function on the backend that calls my library. 
* To solve the above, see how I did this in the dev and prod folders with my TestBed component and the server_back.js file.

<br /><br />
## Getting started
------
### Set-up
1. Clone it
2. Install dependencies: 

```sh
$ cd code
$ npm run installdeps
```

* It might be possible to further enhance this build environment by merging /dev and /build,
but this was a good way to churn out a set-up that takes into account npm module creation.

<br />
### Commands
(Run these from within ./code)
<br /><br />
* Developing: 
```sh
$ npm start
```

* Building:
```sh
$ npm run build
```

* 'Production' environment test:
```sh
$ npm run prod
```
