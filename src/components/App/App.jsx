import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ip from 'ip';

import Messangers from './components/Messangers';
import Blocklink from './components/Blocklink';
import Header from './components/Header';
import Form from './components/Form';
import Chat from './components/Chat';

import './App.less';
import state from './data.js';

class Chat3 extends Component {
    constructor(props) {
        super(props);

        this.state = state;

        setTimeout(() => {
            this.actionChat();
        }, this.randomTime(7000, 15000));

        const cookies = new Cookies();
        const {nameCookies} = this.state;

        if (!cookies.get(nameCookies)) {
            this.createCookies(nameCookies);

            const {id} = cookies.get(nameCookies);

            this.sendId(ip.address(), id);
            this.sendDefaultText();
        } else {
            const {id} = cookies.get(nameCookies);

            this.sendId(ip.address(), id);
            this.getDialog(id);
        }
    }

    render () {
        const {
            actionChat,
            actionForm,
            actionBlockLink,
            form,
            blockLink,
            chat,
            userPhoto,
            message,
            error,
            reply,
            messangerAction
        } = this.state;

        return (
            <div className="rChat">
                <div className="rChat__context">
                    <Header
                        changeActionChat={this.changeActionChat}
                        actionChat={actionChat}
                    />
                    <div
                        className={`rChat__body
                            ${actionChat ? 'rChat__body_action' : ''}
                            ${actionChat && actionForm && !actionBlockLink ? 'rChat__body_action-form' : ''}`}
                    >
                        <div className="rChat__body_i">
                            {!actionChat || error ? null :
                                <div className="rChat__body_chat">
                                    <Form
                                        changeActionForm={this.changeActionForm}
                                        changeInfoForm={this.changeInfoForm}
                                        actionForm={actionForm && !actionBlockLink}
                                        clearForm={this.clearForm}
                                        data={form}
                                        sendMessage={this.sendMessage}
                                    />
                                    <div className="rChat__body_chat-bottom">
                                        <Chat
                                            chat={chat}
                                            message={message}
                                            addMessage={this.addMessage}
                                            changeMessage={this.changeMessage}
                                            activeReply={this.activeReply}
                                            userPhoto={userPhoto}
                                            reply={reply}
                                        />
                                        <div
                                            className={`rChat__form_action
                                                ${actionForm ? 'rChat__form_action_action' : ''}`}
                                            onClick={this.changeActionForm}
                                        >
                                            <p className="rChat__form_action-text">
                                                {actionForm ? 'Свернуть' :
                                                    <Fragment>
                                                        или
                                                        <span className="rChat__form_action-text_underline">
                                                            оставьте свои контакты
                                                        </span>
                                                    </Fragment>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!error || !actionChat || actionBlockLink ? null :
                                <Form
                                    changeActionForm={this.changeActionForm}
                                    changeInfoForm={this.changeInfoForm}
                                    actionForm={actionForm}
                                    clearForm={this.clearForm}
                                    data={form}
                                    type="Error"
                                    sendMessage={this.sendMessage}
                                />
                            }
                        </div>
                    </div>
                </div>
                {!actionChat ? null :
                    <Messangers
                        actionBlock={this.activeBlockLink}
                        messangerAction={messangerAction}
                        changeMessangerAction={this.changeMessangerAction}
                        message={message}
                        sendMessage={this.sendMessage}
                    />
                }
                <Blocklink
                    close={this.disactiveBlockLink}
                    action={actionBlockLink && actionChat}
                    url={blockLink.url}
                    qr={blockLink.qrCode}
                    name={messangerAction}
                    sendMessage={this.sendMessage}
                />
            </div>
        );
    }

    actionChat = () => {
        this.setState({
            actionChat: true
        });
    }

    changeActionChat = () => {
        this.setState(({actionChat}) => ({
            actionChat: !actionChat
        }));
    }

    changeActionForm = () => {
        this.setState(({actionForm}) => ({
            actionForm: !actionForm
        }));
    }

    changeInfoForm = ({target: {name, value}}) => {
        this.setState(({form}) => ({
            form: {
                ...form,
                [name]: value
            }
        }));
    }

    clearForm = () => {
        this.setState({
            form: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        });
    }

    addMessage = message => {
        const cookies = new Cookies();

        const {chat, nameCookies} = this.state;
        const {id} = cookies.get(nameCookies);

        this.sendMessage(message, id);

        chat.push(message);

        if (message.to !== 'robot') {
            this.sendReply(message.message);
        }

        this.setState({
            chat: chat
        });
    }

    sendReply = message => {
        const {pathToAction} = this.state;

        setTimeout(() => {
            axios.post(`${pathToAction}send_reply.php`, JSON.stringify({message}))
                .then(({data}) => {
                    this.disactiveReply();

                    if (!data) {
                        this.notReply();
                    } else if (data instanceof Array) {
                        data.forEach(el => {
                            this.addMessage({to: 'robot', message: el});
                        });
                    } else {
                        this.addMessage({to: 'robot', message: data});
                    }
                })
                .catch(error => {
                    this.notReply();
                    console.warn(error);
                });
        }, this.randomTime(7000, 15000));
    }

    notReply = () => {
        this.setState({
            error: true
        });
    }

    sendMessage = (message, id, type = 'message') => {
        const {pathToAction} = this.state;

        if (!id) {
            const cookies = new Cookies();
            const {nameCookies} = this.state;

            id = cookies.get(nameCookies).id;
        }

        const param = {
            message,
            id,
            date: new Date().toString(),
            ip: ip.address(),
            systemInfo: navigator.userAgent,
            type,
            addStatistic: message.to === 'user'
        };

        axios.post(`${pathToAction}add_message.php`, JSON.stringify(param))
            .then(response => {})
            .catch(error => {
                this.notReply();
                console.warn(error);
            });
    }

    changeMessage = message => {
        this.setState({
            message
        });
    }

    sendDefaultText = () => {
        this.addMessage({to: 'robot', message: 'Здравствуйте'});

        this.addMessage({to: 'robot', message: 'Я могу вам помочь?'});
    }

    createCookies = nameCookie => {
        const cookies = new Cookies();

        let rand = 10000000 + Math.random() * (99999999 + 1 - 10000000);
        rand = Math.floor(rand);

        const id = ip.address().replace(/[.]/g, '') + rand;
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 60);

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

    sendId = (ipAdress, id) => {
        const {pathToAction} = this.state;

        axios.post(`${pathToAction}create.php`, JSON.stringify({id, ip: ipAdress}))
            .then(response => {})
            .catch(error => {
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
                this.notReply();
                console.warn(error);
            });
    }

    activeReply = () => {
        setTimeout(() => {
            this.setState({reply: true});
        }, this.randomTime(1500, 2500));
    }

    disactiveReply = () => {
        this.setState({reply: false});
    }

    activeBlockLink = (url, qrCode) => {
        this.setState({
            actionBlockLink: true,
            blockLink: {
                url,
                qrCode
            }
        });
    }

    disactiveBlockLink = () => {
        this.setState({actionBlockLink: false});
        this.changeMessangerAction('');
    }

    changeMessangerAction = name => this.setState({messangerAction: name});

    randomTime = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export default Chat3;
