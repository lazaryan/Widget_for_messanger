import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Messangers from '_components/Messangers';
import QRLink from '_components/QRcode';
import Chat from '_components/Chat';

import Button from '_components/Button';

import '_styles/App.less';

class App extends Component {
	state = {
		showMessangers: false,
		showLinkMenu: false,
		showChat: true,
		dataLinkMenu: {
			url: '#',
			qr_icon: ''
		}
	}

	render () {
		const {showMessangers, showLinkMenu, dataLinkMenu, showChat} = this.state;
		return (
			<div className="message-block">
				{ showChat ? <Chat /> : null }
				{ showMessangers ? <Messangers showMenuLink={this.actioveLinkMenu}/> : null }
				{ showLinkMenu ? <QRLink data={dataLinkMenu} close={this.closeMenus} /> : null }

				<button className="react-button" onClick={ this.activeMenu }>
					<span className="react-button__burger"></span>
				</button>
			</div>
		)
	}

	activeMenu = () => {
		/*this.setState(({ showMessangers }) => ({
			showMessangers: !showMessangers,
			showLinkMenu: false
		}))*/
		this.setState(({showChat}) => ({
			showChat: !showChat
		}))
	}

	actioveLinkMenu = ({url, qr_icon}) => {
		this.setState({
			dataLinkMenu: {
				url,
				qr_icon
			}
		})

		this.setState({
			showMessangers: false,
			showLinkMenu: true
		})
	}

	closeMenus = () => {
		this.setState({
			showMessangers: false,
			showLinkMenu: false
		})
	}
}

export default App;
