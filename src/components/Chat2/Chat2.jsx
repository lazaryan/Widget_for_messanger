import React, {Component, Fragment} from 'react';
import axios from 'axios';

import Header from './components/Header';
import UserForm from './components/UserForm';
import Chat from './components/Chat';
import ErrorBlock from './components/ErrorBlock';
import Messangers from './components/Messangers';
import QRcode from '_components/QRcode';

import './Chat2.less';

class Chat2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: false,
            error: false,
            messangers: false,
            userForm: {
                name: '',
                phone: ''
            },
            chat: [],
            diary: {},
            dataLinkMenu: {
                url: '#',
                qr_icon: '',
                action: false
            }
        };

        this.getDiary();
    }

    render () {
        const {action, userForm, chat, error, messangers} = this.state;
        const actionDataLink = this.state.dataLinkMenu.action;
        const {dataLinkMenu: {url, qr_icon}} = this.state;

        return (
            <div className="r-chat">
                <Header
                    activeChat={this.activeChat}
                    disactiveChat={this.disactiveChat}
                    action={action}
                />
                <div className={`r-chat__body
                    ${action ? 'r-chat__body_active' : ''}
                    ${action && !error ? 'r-chat__body_active_padding' : ''}`}
                >
                    {!action || error ? null :
                        <Fragment>
                            <UserForm changeUserInfo={this.changeUserInfo} data={userForm}/>
                            <Chat chat={chat} addMessage={this.addMessage}/>
                        </Fragment>
                    }
                    {!action || !error || messangers ? null :
                        <ErrorBlock
                            activeMessangers={this.activeMessangers}
                        />
                    }
                    {!action || !messangers || actionDataLink ? null :
                        <Messangers showMenuLink={this.showMenuLink} />
                    }
                    {!action || !messangers || !actionDataLink ? null :
                        <QRcode
                            data={{url, qr_icon}}
                            close={this.closeMenuLink}
                        />
                    }
                </div>
            </div>
        );
    }

    activeChat = () => {
        const {action} = this.state;

        if (!action) {
            this.setState({
                action: true
            });
        }
    }

    disactiveChat = () => {
        this.setState({
            action: false
        });
    }

    changeUserInfo = ({target: {name, value}}) => {
        this.setState(({userForm}) => ({
            userForm: {
                ...userForm,
                [name]: value
            }
        }));
    }

    addMessage = message => {
        const {chat} = this.state;
        chat.push(message);

        this.setState({
            chat: chat
        });

        if (message.to !== 'robot') {
            this.sendReply(message.text);
        }
    }

    sendReply = message => {
        const {diary} = this.state;

        const key = this.getMessage(message);

        console.log(diary[key] instanceof Array);

        if (!key) {
            this.notReply();
        } else if (diary[key] instanceof Array) {
            diary[key].forEach(el => {
                this.addMessage({to: 'robot', text: el});
            });
        } else {
            this.addMessage({to: 'robot', text: diary[key]});
        }
    }

    notReply = () => {
        this.setState({
            error: true
        });
    }

    activeMessangers = () => {
        this.setState({
            messangers: true
        });
    }

    showMenuLink = ({url, qr_icon}) => {
        this.setState(PrevState => ({
            ...PrevState,
            dataLinkMenu: {
                url,
                qr_icon,
                action: true
            }
        }));
    }

    closeMenuLink = () => {
        this.setState(prevState => ({
            ...prevState,
            dataLinkMenu: {
                url: '#',
                qr_icon: '',
                action: false
            }
        }));
    }

    getDiary = () => {
        axios.get('./diary.json')
            .then(({data}) => {
                this.setState({
                    diary: data
                });
            })
            .catch(error => {
                console.warn(error);
            });
    }

    getMessage = message => {
        const {diary} = this.state;
        const words = message.toLowerCase().split(' ');
        let res = {
            count: 0,
            key: ''
        };

        const keys = Object.keys(diary);
        keys.forEach(el => {
            const text = el.toLowerCase().split(' ');
            let count = 0;

            words.forEach(word => {
                if (text.some(w => w === word)) {
                    count++;
                }
            });

            if (count > res.count) {
                res = {
                    count: count,
                    key: el
                };
            }
        });

        return res.key;
    }
}

export default Chat2;
