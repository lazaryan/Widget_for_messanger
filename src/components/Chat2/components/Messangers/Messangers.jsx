import React, {Component} from 'react';

import Link from '_components/Link';

import logo_whatsApp from './icons/whatsapp.svg';
import logo_facebook from './icons/messenger.svg';
import logo_email from './icons/message.svg';

import qr_whatsApp from './qr_code/whatsapp.png';
import qr_facebook from './qr_code/facebook.png';

import './Messangers.less';

class Messangers extends Component {
    render () {
        return (
            <div>
                <Link
                    url={{
                        href: 'https://api.whatsapp.com/send?',
                        phone: '89185966155',
                        text: 'test text'
                    }}
                    title="WhatsApp"
                    icon={logo_whatsApp}
                    qr_icon={qr_whatsApp}
                    showActionMenu={this.props.showMenuLink}
                />
                <Link
                    url={{
                        href: 'http://m.me/100005528415912?'
                    }}
                    title="Messanger"
                    icon={logo_facebook}
                    qr_icon={qr_facebook}
                    showActionMenu={this.props.showMenuLink}
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
        );
    }
}

export default Messangers;