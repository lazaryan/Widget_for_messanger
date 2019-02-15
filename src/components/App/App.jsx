import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Messangers from '_components/Messangers';
import Button from '_components/Button';

import '_styles/App.less';

class App extends Component {
	constructor(props) {
		super(props);

		this.activeMenu = this.activeMenu.bind(this);

		this.state = {
			showMessangers: false
		}
	}

	render () {
		return (
			<div className="message-block">
				{ this.state.showMessangers ? <Messangers /> : null }

				<button className="react-button" onClick={ this.activeMenu }>
					<span className="react-button__burger"></span>
				</button>
			</div>
		)
	}

	activeMenu () {
		this.setState({showMessangers: !this.state.showMessangers});
	}
}

export default App;
