import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './Chat.less';

import women from './women.png';

const propTypes = {
    chat: PropTypes.array
};

const defaultProps = {
    chat: []
};

class Chat extends Component {
    render () {
        const {chat} = this.props;

        return (
            <div className="rChat__chat">
                {chat.map((el, index) =>
                    <Fragment key={index}>
                        {this.message(el)}
                    </Fragment>
                )}
            </div>
        );
    }

    message = ({to, message, name = 'Ирина Битрис'}) => {
        if (to === 'robot') {
            return (
                <div className="rChat__message rChat__message_left">
                    <div className="rChat__message_user-photo">
                        <img className="rChat__message_user-photo-i" src={women} />
                    </div>
                    <div className="rChat__message_block">
                        <p className="rChat__message_user-name">{name}</p>
                        <div className="rChat__message_text rChat__message_text_left">{message}</div>
                    </div>
                </div>
            );
        } else if (to === 'user') {
            return (
                <div className="rChat__message rChat__message_right">
                    <div className="rChat__message_text rChat__message_text_right">{message}</div>
                </div>
            );
        }

        return null;
    }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

export default Chat;
