import React, {Component} from 'react';

import Body from '_components/Body';
import Link from '_components/Link';

import logo_whatsApp from './icons/whatsapp.svg';
import logo_facebook from './icons/messenger.svg';
import logo_viber from './icons/viber.svg';
import logo_email from './icons/message.svg';

import qr_whatsApp from './qr_code/whatsapp.png';
import qr_facebook from './qr_code/facebook.png';

class Messangers extends Component {
    render () {
        return (
            <Body>
                <Link
                    url={{
                        href: 'https://api.whatsapp.com/send?',
                        phone: '84991120113'
                    }}
                    title="WhatsApp"
                    icon={logo_whatsApp}
                    qr_icon={qr_whatsApp}
                    showActionMenu={this.props.showMenuLink}
                />
                <Link
                    url={{
                        href: 'https://www.facebook.com/hprosmen.ru/'
                    }}
                    title="Messanger"
                    icon={logo_facebook}
                    qr_icon={qr_facebook}
                    showActionMenu={this.props.showMenuLink}
                />
                <Link
                    url={{
                        href: 'hprosmen@mail.ru'
                    }}
                    type="email"
                    title="Наша почта"
                    icon={logo_email}
                />
            </Body>
        );
    }
}

export default Messangers;
