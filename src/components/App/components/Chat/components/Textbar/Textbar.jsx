import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Textbar.less';
import iconArrow from './telegram.svg';

const propTypes = {
    addMessage: PropTypes.func,
    changeMessage: PropTypes.func,
    activeReply: PropTypes.func,
    message: PropTypes.string,
    classname: PropTypes.string
};

const defaultProps = {
    addMessage: () => {},
    changeMessage: () => {},
    activeReply: () => {},
    message: '',
    classname: ''
};

class Textbar extends Component {
    componentDidMount () {
        this.textarea.focus();
    }

    render () {
        const {message, classname} = this.props;

        return (
            <div className="rChat__textbar">
                <div className="rChat__textbar_text-body">
                    <textarea
                        className="rChat__textbar_textarea"
                        placeholder="Введите ваше сообщение..."
                        value={message || ''}
                        onChange={this.changeText}
                        onKeyDown={this.handleKeyPress}
                        ref={textarea => {
                            this.textarea = textarea;
                        }}
                    />
                </div>
                <div className="rChat__textbar_action-body">
                    <button
                        className="rChat__textbar_action"
                        onClick={this.sendMessage}
                    >
                        <img src={iconArrow} />
                    </button>
                </div>
            </div>
        );
    }

    changeText = ({target: {value}}) => {
        const {changeMessage} = this.props;

        if (value.length > 150) {
            return;
        }

        changeMessage(value);

        return;
    }

    handleKeyPress = e => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage = () => {
        const {
            message,
            addMessage,
            changeMessage,
            activeReply
        } = this.props;

        console.log('send');

        if (message) {
            activeReply();
            addMessage({to: 'user', message});

            changeMessage('');
        }
    }
}

Textbar.propTypes = propTypes;
Textbar.defaultProps = defaultProps;

export default Textbar;
