import React, {Component} from 'react';

import './Form.less';
import iconArrow from './icons/up-arrow.svg';

const defaultPlaceHolder = 'Введите сообщение';

class Form extends Component {
    state = {
        message: ''
    }

    componentDidMount () {
        this.textarea.focus();
    }

    render () {
        const {message} = this.state;

        return (
            <div className="r-chat__page-chat">
                <div className="r-chat__page-chat_text">
                    <textarea
                        className="r-chat__page-chat_textarea"
                        placeholder={defaultPlaceHolder}
                        value={message}
                        onChange={this.changeText}
                        onKeyDown={this.handleKeyPress}
                        ref={textarea => {
                            this.textarea = textarea;
                        }}
                    />
                </div>
                <div className="r-chat__page-chat_submit">
                    <button
                        className="r-chat__page-chat_submit-i"
                        onClick={this.sendMessage}
                    >
                        <img src={iconArrow} />
                    </button>
                </div>
            </div>
        );
    }

    changeText = ({target: {value}}) => {
        this.setState({
            message: value
        });
    }

    handleKeyPress = e => {
        const {message} = this.state;

        if (e.keyCode === 13 && e.shiftKey === false && message.length > 0) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage = () => {
        const {sendMessage} = this.props;
        const {message} = this.state;

        if (message) {
            sendMessage({to: 'user', text: message});

            this.setState({
                message: ''
            });
        }
    }
}

export default Form;
