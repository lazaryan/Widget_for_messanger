import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ip from 'ip';

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
            dataLinkMenu: {
                url: '#',
                qr_icon: '',
                action: false
            },
            nameCookies: 'rChat',
            pathToAction: './'
        };

        this.getActionPath();

        const cookies = new Cookies();

        if (!cookies.get(this.state.nameCookies)) {
            this.createCookies(this.state.nameCookies);

            const {id} = cookies.get(this.state.nameCookies);

            this.sendId(id);
            this.sendDefaultText(id);
        } else {
            const {id} = cookies.get(this.state.nameCookies);

            this.sendId(id);
            this.getDialog(id);
        }

        setTimeout(() => {
            this.activeChat();
        }, 5000);
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
        const cookies = new Cookies();

        const {chat, nameCookies} = this.state;
        const {id} = cookies.get(this.state.nameCookies);

        this.sendMessage(message, id);

        chat.push(message);

        if (message.to !== 'robot') {
            this.sendReply(message.text);
        }

        this.setState({
            chat: chat
        }, () => resolve());
    })

    sendReply = message => {
        const {pathToAction} = this.state;

        axios.post(`${pathToAction}send_reply.php`, JSON.stringify({text: message}))
            .then(({data}) => {
                if (!data) {
                    this.notReply();
                } else if (data instanceof Array) {
                    data.forEach(el => {
                        this.addMessage({to: 'robot', text: el});
                    });
                } else {
                    if (!data) {
                        this.notReply();
                    }

                    this.addMessage({to: 'robot', text: data});
                }
            })
            .catch(error => {
                this.notReply();
                console.warn(error);
            });
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

    createCookies = nameCookie => {
        const cookies = new Cookies();

        let rand = 10000 + Math.random() * (99999 + 1 - 10000);
        rand = Math.floor(rand);

        const id = ip.address().replace(/[.]/g, '') + rand;
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

        cookies.set(
            nameCookie,
            {
                id: id
            },
            {
                path: '/',
                expires: expires
            }
        );
    }

    sendId = id => {
        const {pathToAction} = this.state;

        axios.post(`${pathToAction}create.php`, JSON.stringify({id}))
            .then(response => {})
            .catch(error => {
                console.warn(error);
            });
    }

    sendMessage = (message, id) => {
        const {pathToAction} = this.state;
        const param = {
            message,
            id
        };

        axios.post(`${pathToAction}add_message.php`, JSON.stringify(param))
            .then(response => {})
            .catch(error => {
                this.notReply();
                console.warn(error);
            });
    }

    getDialog = id => {
        const {pathToAction} = this.state;

        axios.post(`${pathToAction}get_dialog.php`, JSON.stringify({id}))
            .then(({data}) => {
                if (!data || data.length === 0) {
                    this.sendDefaultText();
                } else {
                    data.forEach(item => {
                        const {chat} = this.state;
                        chat.push(item);

                        this.setState({
                            chat: chat
                        });
                    });
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    sendDefaultText = () => {
        this.addMessage({to: 'robot', text: 'Здравствуйте'});
        this.addMessage({to: 'robot', text: 'Я могу вам помочь?'});
    }

    getActionPath = () => {
        axios.get('./rChatPath.json')
            .then(({data}) => {
                if (data.DIR_PHP) {
                    this.setState({
                        pathToAction: data.DIR_PHP
                    });
                }
            })
            .catch(error => {
                this.getDefaultPath();
            });
    }

    getDefaultPath = () => {
        this.setState({
            pathToAction: './'
        });
    }
}

export default Chat2;
