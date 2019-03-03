import React, {Component} from 'react';
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
                email: '',
                message: '',
                phone: '',
                action: false
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
        const actionUserForm = this.state.userForm.action;
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
                        <Chat chat={chat} addMessage={this.addMessage}/>
                    }
                    {!action || !error || messangers || actionUserForm ? null :
                        <ErrorBlock
                            activeMessangers={this.activeMessangers}
                            activeUserForm={this.activeUserForm}
                        />
                    }
                    {!action || !messangers || actionDataLink ? null :
                        <Messangers
                            showMenuLink={this.showMenuLink}
                            close={this.closeMenuMessangers}
                        />
                    }
                    {!action || !messangers || !actionDataLink ? null :
                        <QRcode
                            data={{url, qr_icon}}
                            close={this.closeMenuLink}
                        />
                    }
                    {!action || !actionUserForm ? null :
                        <UserForm
                            changeUserInfo={this.changeUserInfo}
                            data={userForm}
                            close={this.closeUserForm}
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

    addMessage = message => new Promise((resolve, reject) => {
        const {chat} = this.state;
        chat.push(message);

        this.setState({
            chat: chat
        });

        if (message.to !== 'robot') {
            this.sendReply(message.text);
        }

        resolve();
    })

    sendReply = message => {
        const {diary} = this.state;

        const key = this.getMessage(message);

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

    closeMenuMessangers = () => {
        this.setState({
            messangers: false
        });
    }

    activeUserForm = () => {
        const {userForm} = this.props;

        this.setState({
            userForm: {
                ...userForm,
                action: true
            }
        });
    }

    closeUserForm = () => {
        const {userForm} = this.props;

        this.setState({
            userForm: {
                ...userForm,
                action: false
            }
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
