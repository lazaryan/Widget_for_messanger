import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageLinks from '../MessageLinks';

import './App.less';

class App extends Component {
	render () {
		return (
			<div className="message-block">
				<MessageLinks />
				Кнопка!!!
			</div>
		)
	}
}

export default App;
