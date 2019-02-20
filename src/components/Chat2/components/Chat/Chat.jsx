import React, {Component} from 'react';

import './Chat.less';

const defaultMessage = [
    'Здравствуйте',
    'Я могу вам помочь?'
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
            <div className="r-chat__chat-body">
                {chat.map((item, index) =>
                    <div key={index}>{item}</div>
                )}
            </div>
        );
    }

    addMessage = message => {
        const {addMessage} = this.props;

        addMessage(message);
    }

    showDefaultMessage = () => {
        defaultMessage.map(message => {
            this.addMessage(message);
        });
    }
}

export default Chat;
