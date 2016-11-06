/* ******************************
 * [handle.js]
 * This file holds event handling support code
 *
 * Notes:
 *
 ******************************/

/**
* Dependencies
*/
import helpers from './../../../helpers/index';
import communicator from './communicator';

/**
 * Object
 */

let exposed = new class {

	// onChange radiobuttons logLevel
	onChangeLogLevel(e) {
		this.props.fields.resultLoggedMessage.value = '';
		this.shouldHideTranslationHeader = true;

		this.setState({
			logLevel : e.currentTarget.value,
			checked : {
				logLevel : {
					debug : (e.currentTarget.value === 'debug' ? true : false),
					info : (e.currentTarget.value === 'info' ? true : false),
					error : (e.currentTarget.value === 'error' ? true : false)
				},
				logOutput : {
					console : this.state.checked.logOutput.console,
					file : this.state.checked.logOutput.file,
					stream : this.state.checked.logOutput.stream
				},
				logLocationLookIn : {
					projectRoot : this.state.checked.logLocationLookIn.projectRoot,
					driveRoot : this.state.checked.logLocationLookIn.driveRoot
				}
			}
		});
	}

	// onChange radiobuttons logOutput
	onChangeLogOutput(e) {
		this.props.fields.resultLoggedMessage.value = '';
		this.shouldHideTranslationHeader = true;

		this.setState({
			logOutput : e.currentTarget.value,
			checked : {
				logLevel : {
					debug : this.state.checked.logLevel.debug,
					info : this.state.checked.logLevel.info,
					error : this.state.checked.logLevel.error
				},
				logOutput : {
					console : (e.currentTarget.value === 'console' ? true : false),
					file : (e.currentTarget.value === 'file' ? true : false),
					stream : (e.currentTarget.value === 'stream' ? true : false)
				},
				logLocationLookIn : {
					projectRoot : this.state.checked.logLocationLookIn.projectRoot,
					driveRoot : this.state.checked.logLocationLookIn.driveRoot
				}
			}
		});
	}

	// onChange radiobuttons logLocationLookIn
	onChangeLogLocationLookIn(e) {
		this.props.fields.resultLoggedMessage.value = '';
		this.shouldHideTranslationHeader = true;

		this.setState({
			logLocationLookIn : e.currentTarget.value,
			checked : {
				logLevel : {
					debug : this.state.checked.logLevel.debug,
					info : this.state.checked.logLevel.info,
					error : this.state.checked.logLevel.error
				},
				logOutput : {
					console : this.state.checked.logOutput.console,
					file : this.state.checked.logOutput.file,
					stream : this.state.checked.logOutput.stream
				},
				logLocationLookIn : {
					projectRoot : (e.currentTarget.value === 'projectRoot' ? true : false),
					driveRoot : (e.currentTarget.value === 'driveRoot' ? true : false)
				}
			}
		});
	}

	submit(formStatus, fields) {
		// Initial state
		const fieldState = this.props.fields,
			logOutputType = this.state.logOutput,
			logLevel = this.state.logLevel,
			logMessage = fieldState.logMessage.value,
			logLocationPath = fieldState.logLocationPath.value,
			logLocationLookIn = this.state.logLocationLookIn,
			logOutputTypeFiltered = helpers.mutation.typography.removeWhitespace(logOutputType),
			logLevelFiltered = helpers.mutation.typography.removeWhitespace(logLevel),
			logMessageFiltered = helpers.mutation.typography.removeWhitespace(logMessage),
			logLocationLookInFiltered = helpers.mutation.typography.removeWhitespace(logLocationLookIn),
			logLocationPathFiltered = helpers.mutation.typography.removeWhitespace(logLocationPath);

		if (!formStatus.touched && (logLevelFiltered == '') && (logOutputTypeFiltered === '')) {
			alert('Please fill out the form.');
			return;
		}

		if (logMessageFiltered == '') {
			alert('Please fill in a message');
			return;
		}

		if (logLevelFiltered == '') {
			alert('Please add a log level');
			return;
		}

		if (logOutputTypeFiltered === '') {
			alert('Please add an output');
			return;
		}

		if (logOutputType === 'file' && (logLocationLookInFiltered == '')) {
			alert('Please add a root directory');
			return;
		}

		// No errors found, continue.

		// Log the message
			// Define it
			let newLogMessage = {
				messageContent : logMessage,
				messageLevel : logLevel,
				messageOutput : logOutputType
			};

			// Add specific extras that correspond to the different output types
				// File output
				if (logOutputType == 'file'){
					if (this.state.checked.logLocationLookIn.driveRoot){
						newLogMessage.messageLocationLookIn = 'driveRoot';
					} else if (this.state.checked.logLocationLookIn.projectRoot){
						newLogMessage.messageLocationLookIn = 'projectRoot';
					}

					if (logLocationPathFiltered !== ''){
						let messageLocationPath = logLocationPath;

						// Filter a slash if it exists at char location 0
						if (messageLocationPath.charAt(0) === '/'){
							messageLocationPath = messageLocationPath.slice(1, messageLocationPath.length);
						}

						newLogMessage.messageLocationPath = messageLocationPath;
					}
				}

				// Stream output
				if (logOutputType == 'stream'){

				}

			// Fire off a the logging
			communicator.postLog(newLogMessage, (result) => this.mutateComponent(result));
	}

	keyPress(e) {
		if (e.key === 'Enter') {
			// Prevent enter key, Formous doesn't seem to like the enter key
			e.preventDefault();
		}
	}
};

/**
 * Export
 */
module.exports = exposed;
