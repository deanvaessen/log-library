/*******************************
 * [_app.js]
 * Define the root component code here
 ******************************/

/**
* { Dependencies }
*/

require('normalize.css/normalize.css');
require('./app.scss');
require('./../../stylesupport/index.scss');

import React from 'react';
import TestBed from './../TestBed/TestBed';


/**
 * { Component }
 */

class AppComponent extends React.Component {

	render() {
		return (
			<div className="index">
				<TestBed />
			</div>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
