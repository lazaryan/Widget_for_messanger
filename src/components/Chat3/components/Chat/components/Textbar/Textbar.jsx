import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Textbar.less';
import iconArrow from './arrow.svg';

const propTypes = {
    addMessage: PropTypes.func,
    changeMessage: PropTypes.func,
    message: PropTypes.string
};

const defaultProps = {
    addMessage: () => {},
    changeMessage: () => {},
    message: ''
};

class Textbar extends Component {
    componentDidMount () {
        this.textarea.focus();
    }

    render () {
        const {message} = this.props;

        return (
            <div className="rChat__textbar">
                <div className="rChat__textbar_text-body">
                    <textarea
                        className="rChat__textbar_textarea"
                        placeholder="Введите сообщение и нажмите Enter"
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

        changeMessage(value);
    }

    handleKeyPress = e => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage = () => {
        const {message, addMessage, changeMessage} = this.props;

        if (message) {
            addMessage({to: 'user', message});

            changeMessage('');
        }
    }
}

Textbar.propTypes = propTypes;
Textbar.defaultProps = defaultProps;

export default Textbar;
