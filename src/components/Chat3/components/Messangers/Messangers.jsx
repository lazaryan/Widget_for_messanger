import React, {Component} from 'react';

import Messanger from './components/Messanger';

import './Messangers.less';

import logoEmail from './icons/email.svg';
import logoFacebook from './icons/messenger.svg';
import logoWhatsApp from './icons/whatsapp.svg';

class Messangers extends Component {
    render () {
        return (
            <div className="rChat__messangers">
                <Messanger
                    name="E-mail"
                    type="email"
                    logo={logoEmail}
                    url="hprosmen@mail.ru"
                />
                <Messanger
                    name="facebook"
                    logo={logoFacebook}
                    url="https://www.facebook.com/hprosmen.ru/"
                />
                <Messanger
                    name="WhatsApp"
                    logo={logoWhatsApp}
                    url={{
                        href: 'https://api.whatsapp.com/send?',
                        phone: '+74991120113'
                    }}
                />
                <Messanger
                    name="CallUS"
                    type="phone"
                    logo={logoEmail}
                    url="+74991120113"
                />
            </div>
        );
    }
}

export default Messangers;
