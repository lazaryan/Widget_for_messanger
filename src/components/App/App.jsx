import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageLinks from '../MessageLinks';
import Button from '../Button';

import '_styles/App.less';

class App extends Component {
	constructor(props) {
		super(props);

		this.activeMenu = this.activeMenu.bind(this);

		this.state = {
			showLinks: false
		}
	}

	render () {
		return (
			<div className="message-block">
				{this.showMenu()}
				<Button onClick={this.activeMenu} />
			</div>
		)
	}

	showMenu () {
		if (!this.state.showLinks) return null;

		return (
			<MessageLinks />
		)
	}

	activeMenu () {
		this.setState({showLinks: !this.state.showLinks});
	}
}

export default App;
