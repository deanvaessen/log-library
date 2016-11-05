/*******************************
 * [_TestBed.js]
 * Define the TestBed code here
 ******************************/
/*eslint-disable */
/* eslint react/prop-types: 0 */

/**
* { Dependencies }
*/
import React from 'react';
import Formous from 'formous';
require('./TestBed.scss');
import helpers from './../../helpers/index';
import communicator from './communicator';


/**
 * { Component }
 */

class ErrorText extends React.Component {
	render() {
		return <div style={{color : '#f00' }}>
					{this.props.errorText}
				</div>;
	}
 }

 ErrorText.propTypes = {
	// errorText : React.PropTypes.string
	// Prop validation is already done through Formous
};

class TestBed extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.mutateComponent = this.mutateComponent.bind(this);
		this.shouldHideTranslationHeader = true;
		this.onChangeLogLevel = this.onChangeLogLevel.bind(this);
		this.onChangeLogOutput = this.onChangeLogOutput.bind(this);
		this.onChangeLogLocationLookIn = this.onChangeLogLocationLookIn.bind(this);
		this.state = {
			logLevel: '',
			logOutput: '',
			logLocationLookin: '',
			checked : {
				logLevel : {
					debug : false,
					info : false,
					error: false
				},
				logOutput : {
					console : false,
					file : false,
					stream : false
				},
				logLocationLookIn : {
					projectRoot : false,
					driveRoot : false
				}
			}
		}
	}

	componentWillMount() {
	}

	componentDidMount() {
		const user = {test : 123};
	}

	componentWillReceiveProps(nextProps) {
			this.props.setDefaultValues({
				logMessage : '',
				resultLoggedMessage : '',
				shouldHideTranslationHeader : true
			});
	}

	handleSubmit(formStatus, fields) {
		// Initial state
		let fieldState = this.props.fields;

		if (!formStatus.touched && (this.state.logLevel == ' ' || this.state.logLevel === '') && (this.state.logOutput == ' ' || this.state.logOutput === '')) {
			alert('Please fill out the form.');
			return;
		}

		if (!formStatus.valid || helpers.mutation.typography.removeWhitespace(fieldState.logMessage.value) == '') {
			alert('Please fill in a message');
			return;
		}

		if (this.state.logLevel == ' ' || this.state.logLevel === '') {
			alert('Please add a log level');
			return;
		}

		if (this.state.logOutput == ' ' || this.state.logOutput === '') {
			alert('Please add an output');
			return;
		}

		// No errors found, continue.

		// Log the message
			// Define it
			const newLogMessage = {
				messageContent : fieldState.logMessage.value,
				messageLevel : this.state.logLevel,
				messageOutput : this.state.logOutput
			};

			const logOutput = this.state.logOutput;

			// Fire off a the logging
			communicator.postLog(newLogMessage, (result) => this.mutateComponent(result));
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			// Prevent enter key, Formous doesn't seem to like the enter key
			e.preventDefault();
		}
	}

	mutateComponent(payload){
		console.log('----')
		console.log(payload)
		console.log('----')

		this.shouldHideTranslationHeader = false;

		// Pass back into the view
		this.setState(this.props.fields.resultLoggedMessage = {
			value : payload,
			events : this.props.fields.resultLoggedMessage.events,
			valid : this.props.fields.resultLoggedMessage.valid
		});
	}

	// onChange radiobuttons logLevel
	onChangeLogLevel(e) {
		this.props.fields.resultLoggedMessage.value = '';
		this.shouldHideTranslationHeader = true;

		this.setState({
			logLevel: e.currentTarget.value,
			checked : {
				logLevel : {
					debug : (e.currentTarget.value === 'debug' ? true : false),
					info : (e.currentTarget.value === 'info' ? true : false),
					error: (e.currentTarget.value === 'error' ? true : false)
				},
				logOutput : {
					console : this.state.checked.logOutput.console,
					file : this.state.checked.logOutput.file,
					stream : this.state.checked.logOutput.stream
				},
				logLocationLookIn : {
					projectRoot : this.state.checked.logLocationLookIn.projectRoot,
					driveRoot : this.state.checked.logLocationLookIn.driveRoot,
				}
			}
		})
	}

	// onChange radiobuttons logOutput
	onChangeLogOutput(e) {
		this.props.fields.resultLoggedMessage.value = '';
		this.shouldHideTranslationHeader = true;

		this.setState({
		  logOutput: e.currentTarget.value,
		  checked : {
		  	logLevel : {
		  		debug : this.state.checked.logLevel.debug,
		  		info : this.state.checked.logLevel.info,
		  		error: this.state.checked.logLevel.error,
		  	},
		  	logOutput : {
		  		console : (e.currentTarget.value === 'console' ? true : false),
		  		file : (e.currentTarget.value === 'file' ? true : false),
		  		stream: (e.currentTarget.value === 'stream' ? true : false)
		  	},
		  	logLocationLookIn : {
		  		projectRoot : this.state.checked.logLocationLookIn.projectRoot,
		  		driveRoot : this.state.checked.logLocationLookIn.driveRoot,
		  	}
		  }
		})
	}

	// onChange radiobuttons logLocationLookIn
	onChangeLogLocationLookIn(e) {
		this.props.fields.resultLoggedMessage.value = '';
		this.shouldHideTranslationHeader = true;

		this.setState({
		  logLocationLookIn: e.currentTarget.value,
		  checked : {
		  	logLevel : {
		  		debug : this.state.checked.logLevel.debug,
		  		info : this.state.checked.logLevel.info,
		  		error: this.state.checked.logLevel.error,
		  	},
		  	logOutput : {
		  		console : this.state.checked.logOutput.console,
		  		file : this.state.checked.logOutput.file,
		  		stream : this.state.checked.logOutput.stream
		  	},
		  	logLocationLookIn : {
		  		projectRoot : (e.currentTarget.value === 'projectRoot' ? true : false),
		  		driveRoot : (e.currentTarget.value === 'driveRoot' ? true : false),
		  	}
		  }
		})
	}

	render() {

		/*eslint-disable */
		const {
			fields : { logMessage, resultLoggedMessage },
			formSubmit
		} = this.props;
		/*eslint-enable */

		return (
		<div className="TestBed__outerContainer">
			<div className="TestBed__title"><h1>Log me, please</h1></div>
			<div className="TestBed__innerContainer">

				<form onSubmit={formSubmit(this.handleSubmit)}>
					<div className="TestBed__form">
						<div className="TestBed__input">
							<div className="TestBed__logMessage" >
								<h4 className="header">What message would you like to log?</h4>
								<input
									placeholder="Your message"
									type="text"
									ref="TestBed__inputlogMessage"
									className="TestBed__inputlogMessage"
									value={logMessage.value}
									onKeyPress={this.handleKeyPress}
									{ ...logMessage.events }
								/>
								<ErrorText { ...logMessage.failProps } />
								<br />

								<div className="TestBed__LevelAndOutput">
									<div className="TestBed__logLevel">
										<h4 className="header">Which log level?</h4>
										<div className="TestBed__optionsContainer">
											<div className="TestBed__logOption">
												<h5 className="header">Debug</h5>
												<input type="radio" name="logLevel_debug"
																	value="debug"
																	onChange={this.onChangeLogLevel}
																	checked={this.state.checked.logLevel.debug} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="header">Info</h5>
												<input type="radio" name="logLevel_info"
																	value="info"
																	onChange={this.onChangeLogLevel}
																	checked={this.state.checked.logLevel.info} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="header">Error</h5>
												<input type="radio" name="logLevel_error"
																	value="error"
																	onChange={this.onChangeLogLevel}
																	checked={this.state.checked.logLevel.error} />
											</div>
										</div>
									</div>

									<div className="TestBed__logOutput">
										<h4 className="header">Which output?</h4>
										<div className="TestBed__optionsContainer">
											<div className="TestBed__logOption">
												<h5 className="header">Console</h5>
												<input type="radio" name="logOutput_console"
																	value="console"
																	onChange={this.onChangeLogOutput}
																	checked={this.state.checked.logOutput.console} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="header">File</h5>
												<input type="radio" name="logOutput_file"
																	value="file"
																	onChange={this.onChangeLogOutput}
																	checked={this.state.checked.logOutput.file} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="header">Stream</h5>
												<input type="radio" name="logOutput_stream"
																	value="stream"
																	onChange={this.onChangeLogOutput}
																	checked={this.state.checked.logOutput.stream} />
											</div>
										</div>
									</div>
									<br />

									<div className={this.state.checked.logOutput.file ? "TestBed__logLocation" : "hidden"}>
										<h4 className="header">Root 'look-in' directory:</h4>
										<div className="TestBed__optionsContainer">
											<div className="TestBed__logOption">
												<h5 className="header">Project root</h5>
												<input type="radio" name="logLocation_lookInProjectRoot"
																	value="projectRoot"
																	onChange={this.onChangeLogLocationLookIn}
																	checked={this.state.checked.logLocationLookIn.projectRoot} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="header">Drive root</h5>
												<input type="radio" name="logLocation_lookInDriveRoot"
																	value="driveRoot"
																	onChange={this.onChangeLogLocationLookIn}
																	checked={this.state.checked.logLocationLookIn.driveRoot} />
											</div>
										</div>

										<h4 className="header">Set a path:</h4>
										<input
											placeholder="File path"
											type="text"
											ref="TestBed__inputlogMessage"
											className="TestBed__inputFileLocation"
											value={logMessage.value}
											onKeyPress={this.handleKeyPress}
											{ ...logMessage.events }
										/>
									</div>
									<br />
									<br />
								</div>
							</div>

							<hr className={this.shouldHideTranslationHeader ? 'hidden' : ''} />

							<div className={this.shouldHideTranslationHeader ? 'hidden' : 'TestBed__resultLoggedMessage'}>
								<h4 className={this.shouldHideTranslationHeader ? 'hidden header' : 'header'}>
									Your logged message:
								</h4>
								<br />

								<p className=
								{
									this.state.logLevel == 'debug' ? 'TestBed__outputresultLoggedMessage TestBed__loggedMessageDebug'
									:
									this.state.logLevel == 'info' ? 'TestBed__outputresultLoggedMessage TestBed__loggedMessageInfo'
									:
									this.state.logLevel == 'error' ? 'TestBed__outputresultLoggedMessage TestBed__loggedMessageError'
									:
									'TestBed__outputresultLoggedMessage'
								}
								>{this.props.fields.resultLoggedMessage.value}</p>
							</div>
						</div>
					</div>
						<div className="TestBed__buttons">
							<button className="TestBed__submit" type="submit">Submit</button>
							<button className="TestBed__clear" type="button" onClick=
							{(event) => {
								this.shouldHideTranslationHeader = true;
								this.props.clearForm();
							}}>Clear</button>
						</div>
				</form>
			</div>
		</div>
		);
	}
};

TestBed.propTypes = {
	// Prop validation is already done through Formous
};

const formousOptions = {
	fields : {
		logMessage : {
			tests : [
				{
					critical : true,
					failProps : {
						errorText : 'Your message should be a string or number'
					},
					test(value) {
						if (typeof value === 'string' || typeof value === 'number'){
							return true
						} else {
							return false
						}
					}
				}
			]
		},
		resultLoggedMessage : {
			tests : [
			{
				critical : true,
				failProps : {
					errorText : 'N/A'
				},
				test(value) {
					return true
				}
			}
			]
		}
	}
};

export default Formous(formousOptions)(TestBed);
