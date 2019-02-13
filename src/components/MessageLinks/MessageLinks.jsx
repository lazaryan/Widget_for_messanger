import React, { Component } from 'react';

import './MessageLinks.less';

import Link from '../Link';

import logo_whatsApp from './icons/Icon_WhatsApp.svg';
import logo_facebook from './icons/Icon_Facebook_Messenger.svg';

class MessageLinks extends Component {
	render () {
		return (
			<div className="message-block__links">
				<Link 
					url={{
						href: 'https://api.whatsapp.com/send?',
						phone: '79185966155',
						text: 'test text'
					}}
					title="WhatsApp"
					icon={logo_whatsApp}
				/>
				<Link 
					url={{
						href: 'http://m.me/100005528415912?'
					}}
					title="Messanger"
					icon={logo_facebook}
				/>
				<a target="_blank" href="https://api.whatsapp.com/send?phone=79185966155&text=test_text">whatsapp</a>
				<a target="_blank" href="https://viber://chat?number=79185966155">viber</a>
			</div>
		)
	}
}

export default MessageLinks;
