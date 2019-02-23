import React, {Component, Fragment} from 'react';

import Header from './components/Header';
import UserForm from './components/UserForm';
import Chat from './components/Chat';
import ErrorBlock from './components/ErrorBlock';
import Messangers from './components/Messangers';

import './Chat2.less';

class Chat2 extends Component {
    state = {
        action: true,
        error: false,
        messangers: false,
        userForm: {
            name: '',
            phone: ''
        },
        chat: [],
        diary: []
    }

    render () {
        const {action, userForm, chat, error, messangers} = this.state;

        return (
            <div className="r-chat">
                <Header
                    activeChat={this.activeChat}
                    disactiveChat={this.disactiveChat}
                    action={action}
                />
                <div className={`r-chat__body ${action ? 'r-chat__body_active' : ''}`}>
                    {!action || error ? null :
                        <Fragment>
                            <UserForm changeUserInfo={this.changeUserInfo} data={userForm}/>
                            <Chat chat={chat} addMessage={this.addMessage}/>
                        </Fragment>
                    }
                    {!action && !error || messangers ? null :
                        <ErrorBlock
                            activeMessangers={this.activeMessangers}
                        />
                    }
                    {!messangers ? null :
                        <Messangers />
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
            this.sendReply(message);
        }
    }

    sendReply = message => {
        const {diary} = this.state;

        if (diary[message]) {
            this.addMessage({to: 'robot', text: diary[message]});
        } else {
            this.notReply();
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
}

export default Chat2;
