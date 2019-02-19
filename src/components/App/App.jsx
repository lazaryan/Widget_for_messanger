import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Messangers from '_components/Messangers';
import QRLink from '_components/QRcode';
import Chat from '_components/Chat';
import Chat2 from '_components/Chat2';

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
        return (
            <Chat2 />
        );
    }

    activeMenu = () => {
        this.setState(({showChat}) => ({
            showChat: !showChat
        }));
    }

    actioveLinkMenu = ({url, qr_icon}) => {
        this.setState({
            dataLinkMenu: {
                url,
                qr_icon
            }
        });

        this.setState({
            showMessangers: false,
            showLinkMenu: true
        });
    }

    closeMenus = () => {
        this.setState({
            showMessangers: false,
            showLinkMenu: false
        });
    }
}

export default App;
