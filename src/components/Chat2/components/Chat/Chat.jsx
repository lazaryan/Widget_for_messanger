import React, {Component, Fragment} from 'react';

import Form from './components/Form';

import './Chat.less';

const defaultMessage = [
    {to: 'robot', text: 'Здравствуйте'},
    {to: 'robot', text: 'Я могу вам помочь?'}
];

class Chat extends Component {
    constructor (props) {
        super(props);

        this.state = {
            chat: props.chat
        };

        if (this.state.chat.length === 0) {
            this.showDefaultMessage();
        }
    }

    render () {
        const {chat} = this.state;

        return (
            <Fragment>
                <div className="r-chat__chat-body" ref="sendMessage">
                    {chat.map(({to, text}, index) =>
                        <div
                            key={index}
                            className={`r-chat__message-block ${to !== 'user'
                                ? 'r-chat__message_left'
                                : 'r-chat__message_right'}`}
                        >
                            <div className="r-chat__message">
                                {text}
                            </div>
                        </div>
                    )}
                </div>
                <Form
                    sendMessage={this.addMessage}
                />
            </Fragment>
        );
    }

    addMessage = message => {
        const {addMessage} = this.props;

        addMessage(message)
            .then(
                resolve => {
                    if (this.refs.sendMessage) {
                        this.scroll('sendMessage');
                    }
                },
                error => {
                    console.warn(`error new message is: ${error}`);
                }
            );
    }

    showDefaultMessage = () => {
        defaultMessage.map(message => {
            this.addMessage(message);
        });
    }

    scroll = nameRefs => {
        const el = this.refs[nameRefs];

        if (!el) {
            return;
        }

        el.scrollTop = el.scrollHeight;
    }
}

export default Chat;
