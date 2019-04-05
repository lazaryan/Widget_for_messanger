import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Messanger from './components/Messanger';

import './Messangers.less';

import logoEmail from './icons/email.svg';
import logoFacebook from './icons/messenger.svg';
import logoWhatsApp from './icons/whatsapp.svg';
import logoPhone from './icons/phone.svg';

import qrFacebook from './qr/facebook.png';
import qrWhatsApp from './qr/whatsapp.png';

const propTypes = {
    actionBlock: PropTypes.func,
    messangerAction: PropTypes.string,
    changeMessangerAction: PropTypes.func,
    sendMessage: PropTypes.func
};

const defaultProps = {
    actionBlock: () => {},
    messangerAction: '',
    changeMessangerAction: () => {},
    sendMessage: () => {}
};

const data = [
    {
        name: 'E-mail',
        type: 'email',
        logo: logoEmail,
        url: 'hprosmen@mail.ru'
    },
    {
        name: 'Facebook',
        logo: logoFacebook,
        url: 'https://www.messenger.com/t/hprosmen.ru',
        qrCode: qrFacebook
    },
    {
        name: 'WhatsApp',
        logo: logoWhatsApp,
        nameAttrMessage: 'text',
        url: {
            href: 'https://api.whatsapp.com/send?',
            phone: '74991120113'
        },
        qrCode: qrWhatsApp
    },
    {
        name: 'CallUS',
        type: 'phone',
        logo: logoPhone,
        url: '+74991120113'
    }
];

class Messangers extends Component {
    render () {
        const {
            actionBlock,
            messangerAction,
            changeMessangerAction,
            message,
            sendMessage
        } = this.props;

        return (
            <div className="rChat__messangers">
                {
                    data.map((props, index) => (
                        <Messanger key={`messenger-${index}`}
                            {...props}
                            actionBlock={actionBlock}
                            active={props.name === messangerAction}
                            action={changeMessangerAction}
                            text={props.nameAttrMessage ? {message, name: props.nameAttrMessage} : ''}
                            sendMessage={sendMessage}
                        />
                    ))
                }
            </div>
        );
    }
}

Messangers.propTypes = propTypes;
Messangers.defaultProps = defaultProps;

export default Messangers;
