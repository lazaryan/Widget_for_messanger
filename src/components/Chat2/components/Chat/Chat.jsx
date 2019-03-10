import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Form from './components/Form';

import './Chat.less';

const propTypes = {
    chat: PropTypes.array,
    addMessage: PropTypes.func
};

class Chat extends Component {
    constructor (props) {
        super(props);

        this.state = {
            chat: props.chat
        };
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
                    ref={() => this.scroll('sendMessage')}
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

    scroll = nameRefs => {
        const el = this.refs[nameRefs];

        if (!el) {
            return null;
        }

        el.scrollTop = el.scrollHeight;

        return null;
    }
}

Chat.propTypes = propTypes;

export default Chat;
