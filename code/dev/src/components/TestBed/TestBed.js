/*******************************
 * [_TestBed.js]
 * Define the TestBed code here
 ******************************/

/* eslint react/prop-types: 0 */

/**
* { Dependencies }
*/

require('./TestBed.scss');

import React from 'react';
import Formous from 'formous';
import handle from './componentSupport/handle';
import helpers from './../../helpers/index';

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
		// Handlers
			this.handleSubmit = handle.submit.bind(this);
			this.handleKeyPress = handle.keyPress.bind(this);
			this.mutateComponent = this.mutateComponent.bind(this);
			this.onChangeLogLevel = handle.onChangeLogLevel.bind(this);
			this.onChangeLogOutput = handle.onChangeLogOutput.bind(this);
			this.onChangeLogLocationLookIn = handle.onChangeLogLocationLookIn.bind(this);

		// Vars
		this.shouldHideResultHeader = true;

		// State
		this.state = {
			logLevel : '',
			logOutput : '',
			logLocationLookIn : '',
			checked : {
				logLevel : {
					debug : false,
					info : false,
					error : false
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
		};
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
			this.props.setDefaultValues({
				logMessage : '',
				resultLoggedMessage : '',
				logLocationPath : '',
				shouldHideResultHeader : true
			});
	}

	mutateComponent(payload){
		console.log('payload');
		console.log(payload);

		// Show the results block in the view
		this.shouldHideResultHeader = false;

		// Define the view data
		const messageContent = payload.messageContent,
			writePath = payload.writePath;

		// Pass back into the view
		this.setState(this.props.fields.resultLoggedMessage = {
			value : messageContent,
			writePath : writePath,
			events : this.props.fields.resultLoggedMessage.events,
			valid : this.props.fields.resultLoggedMessage.valid
		});
	}

	render() {

		/*eslint-disable */
		const {
			fields : { logMessage, resultLoggedMessage, logLocationPath },
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
									ref="TestBed__inputLogMessage"
									className="TestBed__inputLogMessage"
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
												<h5 className="subheader">Debug</h5>
												<input type="radio" name="logLevel_debug"
																	value="debug"
																	onChange={this.onChangeLogLevel}
																	checked={this.state.checked.logLevel.debug} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="subheader">Info</h5>
												<input type="radio" name="logLevel_info"
																	value="info"
																	onChange={this.onChangeLogLevel}
																	checked={this.state.checked.logLevel.info} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="subheader">Error</h5>
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
												<h5 className="subheader">Console</h5>
												<input type="radio" name="logOutput_console"
																	value="console"
																	onChange={this.onChangeLogOutput}
																	checked={this.state.checked.logOutput.console} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="subheader">File</h5>
												<input type="radio" name="logOutput_file"
																	value="file"
																	onChange={this.onChangeLogOutput}
																	checked={this.state.checked.logOutput.file} />
											</div>
											<div className="TestBed__logOption">
												<h5 className="subheader">Stream</h5>
												<input type="radio" name="logOutput_stream"
																	value="stream"
																	onChange={this.onChangeLogOutput}
																	checked={this.state.checked.logOutput.stream} />
											</div>
										</div>
									</div>
									<br />

									<div className={this.state.checked.logOutput.file ? 'TestBed__logLocation' : 'hidden'}>
										<h5 className="header">Log to which directory?</h5>
										<div className="TestBed__optionsContainer">
											<div className="TestBed__logOption">
												<h6 className="subheader">Project root</h6>
												<input type="radio" name="logLocation_lookInProjectRoot"
																	value="projectRoot"
																	onChange={this.onChangeLogLocationLookIn}
																	checked={this.state.checked.logLocationLookIn.projectRoot} />
											</div>
											<div className="TestBed__logOption">
												<h6 className="subheader">Drive root</h6>
												<input type="radio" name="logLocation_lookInDriveRoot"
																	value="driveRoot"
																	onChange={this.onChangeLogLocationLookIn}
																	checked={this.state.checked.logLocationLookIn.driveRoot} />
											</div>
										</div>

										<h6 className="header">You may add a sub-path:</h6>
										<input
											placeholder="File path"
											type="text"
											ref="TestBed__inputFileLocation"
											className="TestBed__inputFileLocation"
											value={logLocationPath.value}
											onKeyPress={this.handleKeyPress}
											{ ...logLocationPath.events }
										/>
									</div>
									<br />
									<br />
								</div>
							</div>

							<hr className={this.shouldHideResultHeader ? 'hidden' : ''} />

							<div className={this.shouldHideResultHeader ? 'hidden' : 'TestBed__resultLoggedMessage'}>
								<h4 className={this.shouldHideResultHeader ? 'hidden header' : 'header'}>
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

								<div className=
								{
									(
									this.props.fields.logLocationPath.value && this.state.checked.logOutput.file
									) ? 'TestBed__resultLoggedPath' : 'hidden'
								}>
									<h4>
										Your log location:
									</h4>
									<p className='TestBed__outputresultLoggedMessage'>
										{this.props.fields.resultLoggedMessage.writePath}
									</p>
								</div>
							</div>
						</div>
					</div>
						<div className="TestBed__buttons">
							<button className="TestBed__submit" type="submit">Submit</button>
							<button className="TestBed__clear" type="button" onClick=
							{(event) => {
								this.shouldHideResultHeader = true;
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
							return true;
						}

						return false;
					}
				},
				{
					critical : true,
					failProps : {
						errorText : 'Your should input a message'
					},
					test(value) {
						if (helpers.mutation.typography.removeWhitespace(value) == ''){
							return false;
						}
						return true;
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
						return true;
					}
				}
			]
		},
		logLocationPath : {
			tests : [
				{
					critical : true,
					failProps : {
						errorText : 'N/A'
					},
					test(value) {
						return true;
					}
				}
			]
		}
	}
};

export default Formous(formousOptions)(TestBed);
