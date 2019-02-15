import React, { Component } from 'react';

import Body from '_components/Body';
import Link from '_components/Link';

import logo_whatsApp from './icons/whatsapp.svg';
import logo_facebook from './icons/messenger.svg';
import logo_viber from './icons/viber.svg';
import logo_email from './icons/message.svg';

class Messangers extends Component {
	render () {
		return (
			<Body>
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
					options={{
						bth_link: false,
						bth_qr: true
					}}
				/>
				<Link 
					url={{
						href: 'lazaryan99@mail.ru'
					}}
					type="email"
					title="Наша почта"
					icon={logo_email}
					options={{
						bth_link: true,
						bth_qr: false
					}}
				/>
			</Body>
		)
	}
}

export default Messangers;
