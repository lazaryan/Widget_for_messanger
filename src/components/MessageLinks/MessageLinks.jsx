import React, { Component } from 'react';

import '_styles/MessageLinks.less';

import Link from '../Link';

import logo_whatsApp from './icons/whatsapp.svg';
import logo_facebook from './icons/messenger.svg';
import logo_viber from './icons/viber.svg';
import logo_email from './icons/message.svg';

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
				<Link
					url={{
						href: 'viber://chat?',
						number: '79185966155'
					}}
					title="Viber"
					icon={logo_viber}
				/>
				<Link 
					url={{
						href: 'lazaryan99@mail.ru'
					}}
					type="email"
					title="Наша почта"
					icon={logo_email}
				/>
			</div>
		)
	}
}

export default MessageLinks;
