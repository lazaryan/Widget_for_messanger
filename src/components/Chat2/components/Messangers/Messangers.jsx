import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Link from '_components/Link';

import logo_whatsApp from './icons/whatsapp.svg';
import logo_facebook from './icons/messenger.svg';
import logo_email from './icons/message.svg';

import qr_whatsApp from './qr_code/whatsapp.png';
import qr_facebook from './qr_code/facebook.png';

import './Messangers.less';

const propTypes = {
    showMenuLink: PropTypes.func
};

class Messangers extends Component {
    render () {
        const {showMenuLink, close} = this.props;

        return (
            <div className="r-chat__list-messangers">
                <header className="r-chat__list-messangers_header">
                    <h2 className="r-chat__list-messangers_title">Выберите мессенджер</h2>
                    <button
                        className="r-chat__user-form_close"
                        onClick={close}
                    >
                        <span className="r-chat__user-form_close-line"></span>
                    </button>
                </header>
                <Link
                    url={{
                        href: 'https://api.whatsapp.com/send?',
                        phone: '84991120113'
                    }}
                    title="WhatsApp"
                    icon={logo_whatsApp}
                    qr_icon={qr_whatsApp}
                    showActionMenu={showMenuLink}
                />
                <Link
                    url={{
                        href: 'https://www.facebook.com/hprosmen.ru/'
                    }}
                    title="Messanger"
                    icon={logo_facebook}
                    qr_icon={qr_facebook}
                    showActionMenu={showMenuLink}
                />
                <Link
                    url={{
                        href: 'hprosmen@mail.ru'
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
