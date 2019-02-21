import React, {Component, Fragment} from 'react';

import Header from './components/Header';
import UserForm from './components/UserForm';
import Chat from './components/Chat';

import './Chat2.less';

class Chat2 extends Component {
    state = {
        action: true,
        userForm: {
            name: '',
            phone: ''
        },
        chat: []
    }

    render () {
        const {action, userForm, chat} = this.state;

        return (
            <div className="r-chat">
                <Header
                    activeChat={this.activeChat}
                    disactiveChat={this.disactiveChat}
                    action={action}
                />
                <div className={`r-chat__body ${action ? 'r-chat__body_active' : ''}`}>
                    {!action ? null :
                        <Fragment>
                            <UserForm changeUserInfo={this.changeUserInfo} data={userForm}/>
                            <Chat chat={chat} addMessage={this.addMessage}/>
                        </Fragment>
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
    }
}

export default Chat2;
