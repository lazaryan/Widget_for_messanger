import React, {Component, Fragment} from 'react';
import axios from 'axios';

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
    }

    render () {
        const {
            actionChat,
            actionForm,
            form,
            chat,
            userPhoto,
            message
        } = this.state;

        return (
            <div className="rChat">
                <Header
                    changeActionChat={this.changeActionChat}
                    actionChat={actionChat}
                />
                <div className={`rChat__body ${actionChat ? 'rChat__body_action' : ''}`}>
                    {!actionChat ? null :
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
                                userPhoto={userPhoto}
                            />
                        </Fragment>
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
                this.setState({userPhoto: data.PATH_TO_IMAGE_USER});
            })
            .catch(error => {
                this.writeDefaultData();
            });
    }

    writeDefaultData = () => {
        this.setState({userPhoto: ''});
    }

    addMessage = message => {
        const {chat} = this.state;

        chat.push(message);

        this.setState({
            chat
        });
    }

    changeMessage = message => {
        this.setState({
            message
        });
    }
}

export default Chat3;
