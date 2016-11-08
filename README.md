# log-library + SDK

![Screenshot of the front-end component](/meta/screenshot.png?raw=true "Front-end component screenshot")

## Intro
------
* I left in my own build environment, which served as a sort of 'SDK' for the  library and helped me build and test it properly.
* It includes a frontend component, as well as a small backend to test file logging (built on nodeJS).
* The minified version of the library is found in /build/dist.
* The source code of the library is found in /dev/helpers/logger-lib/.

## Details
------
### Docs
* Changelog in meta/changelog

### Library dependencies
* NodeJS
* FS
* Path
* NCP

### Directory Structure
The folders below are controlled by the package.json file in the project/code folder. Where necessary, they have in their own folder a buildglue.js file with extra build commands to tie them together.

* dev - Holds the development folder. This holds the frontend component (src/components/TestBed) to test the library and the library sourcecode (src/helpers/logger-lib).
* build - Holds the build process folder. Each time the dev folder is updated, 'ncp' pumps the library's dev sourcecode to build, and builds the package (thanks nodemon).
* prod - Similar to dev folder, except with built and minified library to import the library and see if it works. Component code and lib code are both synced by 'ncp'/'fs'.


## API reference
------
#### Set up the component and the message:

```sh
import logger from 'yourlocationofthelogger';

Base message:
let newLogMessage = {
	messageContent : logMessage,
	messageLevel : logLevel,
	messageOutput : logOutputType
};
```

#### Add extra fields if necessary:
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

##### Stream-logging:
```sh
// If you want to log to a stream, add a writable stream as input:
const somestream = yourwriteablestream;
newLogMessage.messageSourceStream = somestream;
```

##### Now send it
```sh
logger.postLog(newLogMessage, (result) => {
	// do something with the returned log (result)
});
```

### Gotchas:
* Mind the fact that file logging can only be done through nodeJS. So if you want to log something to a file from the frontend, you will need to have a backend setup and pass the message to a function on the backend that calls my library. 
* To solve the above, see how I did this in the dev and prod folders with my TestBed component and the server_back.js file.

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

### Commands
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
