import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ip from 'ip';

import Header from './components/Header';
import Form from './components/Form';
import Chat from './components/Chat';

import './Chat3.less';
import state from './data.js';

class Chat3 extends Component {
    constructor(props) {
        super(props);

        this.state = state;

        this.getDefaultData();

        setTimeout(() => {
            this.actionChat();
        }, 5000);

        const cookies = new Cookies();
        const {nameCookies} = this.state;

        if (!cookies.get(nameCookies)) {
            this.createCookies(nameCookies);

            const {id} = cookies.get(nameCookies);

            this.sendId(id);
            this.sendDefaultText();
        } else {
            const {id} = cookies.get(nameCookies);

            this.sendId(id);
            this.getDialog(id);
        }
    }

    render () {
        const {
            actionChat,
            actionForm,
            form,
            chat,
            userPhoto,
            message,
            error,
            reply
        } = this.state;

        return (
            <div className="rChat">
                <Header
                    changeActionChat={this.changeActionChat}
                    actionChat={actionChat}
                />
                <div className={`rChat__body ${actionChat ? 'rChat__body_action' : ''}`}>
                    {!actionChat || error ? null :
                        <Fragment>
                            <Form
                                changeActionForm={this.changeActionForm}
                                changeInfoForm={this.changeInfoForm}
                                actionForm={actionForm}
                                clearForm={this.clearForm}
                                data={form}
                            />
                            <Chat
                                chat={chat}
                                message={message}
                                addMessage={this.addMessage}
                                changeMessage={this.changeMessage}
                                activeReply={this.activeReply}
                                userPhoto={userPhoto}
                                reply={reply}
                            />
                        </Fragment>
                    }
                    {!error ? null :
                        <Form
                            changeActionForm={this.changeActionForm}
                            changeInfoForm={this.changeInfoForm}
                            actionForm={actionForm}
                            clearForm={this.clearForm}
                            data={form}
                            type="Error"
                        />
                    }
                </div>
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

    getDefaultData = () => {
        axios.get('./rChatData.json')
            .then(({data}) => {
                if (data.PATH_TO_IMAGE_USER) {
                    this.setState({userPhoto: data.PATH_TO_IMAGE_USER});
                }

                if (data.DIR_PHP) {
                    this.setState({pathToAction: data.DIR_PHP});
                }
            })
            .catch(error => {
                this.writeDefaultData();
            });
    }

    writeDefaultData = () => {
        this.setState({
            userPhoto: '',
            pathToAction: './'
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

        axios.post(`${pathToAction}send_reply.php`, JSON.stringify({message: message}))
            .then(({data}) => {
                if (!data) {
                    this.disactiveReply();
                    this.notReply();
                } else if (data instanceof Array) {
                    this.disactiveReply();
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
    }

    notReply = () => {
        this.setState({
            error: true
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

        let rand = 10000 + Math.random() * (99999 + 1 - 10000);
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

    sendId = id => {
        const {pathToAction} = this.state;

        axios.post(`${pathToAction}create.php`, JSON.stringify({id}))
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
                console.warn(error);
            });
    }

    activeReply = () => {
        this.setState({reply: true});
    }

    disactiveReply = () => {
        this.setState({reply: false});
    }
}

export default Chat3;
