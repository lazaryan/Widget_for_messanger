import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Textbar from './components/Textbar';

import './Chat.less';

const propTypes = {
    chat: PropTypes.array,
    userPhoto: PropTypes.string,
    addMessage: PropTypes.func,
    changeMessage: PropTypes.func,
    activeReply: PropTypes.func,
    message: PropTypes.string,
    classname: PropTypes.bool,
    reply: PropTypes.bool
};

const defaultProps = {
    chat: [],
    userPhoto: '',
    addMessage: () => {},
    changeMessage: () => {},
    activeReply: () => {},
    message: '',
    classname: false,
    reply: false
};

class Chat extends Component {
    render () {
        const {
            chat,
            userPhoto,
            addMessage,
            message,
            changeMessage,
            reply,
            activeReply,
            classname,
            active
        } = this.props;

        console.log('test', active);

        return (
            <Fragment>
                <div className={`rChat__chat ${active ? 'rChat__chat_disactive' : ''}`} ref="sendMessage">
                    {chat.map((el, index) =>
                        <Fragment key={index}>
                            {this.message({...el, userPhoto})}
                        </Fragment>
                    )}
                    {!reply ? null : this.reply()}
                </div>
                <Textbar
                    ref={() => this.scroll('sendMessage')}
                    addMessage={addMessage}
                    message={message}
                    changeMessage={changeMessage}
                    activeReply={activeReply}
                />
            </Fragment>
        );
    }

    message = ({to, message, name = 'Ирина Битрис', userPhoto}) => {
        if (to === 'robot') {
            return (
                <div className="rChat__message rChat__message_left">
                    <div className="rChat__message-i">
                        <div className="rChat__message_body">
                            <div className="rChat__message_user-photo">
                                <img className="rChat__message_user" src={userPhoto} />
                            </div>
                            <div className="rChat__message_left-i">
                                <div className="rChat__message_triangle rChat__message_triangle-left"></div>
                                <div className="rChat__message_text rChat__message_text_left"> {message} </div>
                            </div>
                        </div>
                        <div className="rChat__message_name-user"> {name} </div>
                    </div>
                </div>
            );
        } else if (to === 'user') {
            return (
                <div className="rChat__message rChat__message_right">
                    <div className="rChat__message_text rChat__message_text_right">{message}</div>
                    <div className="rChat__message_triangle rChat__message_triangle-right"></div>
                </div>
            );
        }

        return null;
    }

    reply = () => (
        <div className="rChat__message rChat__message_left rChat__message_reply">
            <p className="rChat__message_reply-cucle">Ирина печатает </p>
        </div>
    )

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
Chat.defaultProps = defaultProps;

export default Chat;
