import React, { Component } from 'react';

import Body from '_components/Body';
import Button from '_components/Button';

import icon_robot from './icons/robot.svg';

import '_styles/Chat.less';

class Chat extends Component {
	state = {
		chat: [{who: 'robot', text: 'Здравствуйте, чем могу помочь?'}],
		message: ''
	}

	render () {
		const {message} = this.state;

		return (
			<Body>
				{ GetHeader() }
				<div className="react__chat__body">
					{ this.ListMessage() }
				</div>
				<div className="react__chat__messages">
					<textarea className="react__chat__messages_textarea"
							placeholder="Введите сообщение"
							value={message}
							onChange={this.changeMessage}
							onKeyDown={this.handleKeyPress}
					/>
					<Button onClick={this.addMessage}>Отправить</Button>
				</div>
			</Body>
		)
	}

	ListMessage = () => {
		const {chat} = this.state;

		return chat.map(({who, text}, index) => {
			return (
				<div key={index} 
					className={`react__chat__message ${who === 'robot' 
								? 'react__chat__message_left'
								: 'react__chat__message_right'}`}
				>
					<div className="react__chat__message_text">
						{text}
					</div>
				</div>
			)
		});
	}

	changeMessage = ({target: {value}}) => {
		if (value.length > 100) return;

		this.setState({
			message: value
		})
	}

	handleKeyPress = (e) => {
		const {message} = this.state;

		if (e.keyCode === 13 && e.shiftKey === false && message.length > 0) {
			e.preventDefault();
			this.addMessage();
		}
	}

	addMessage = () => {
		const {message, chat} = this.state;
		if (message.length === 0) return;

		chat.push({who: 'user', text: message});

		this.setState({
			chat,
			message: ''
		})
	}
}

function GetHeader () {
	return (
		<div className="react__chat__header">
			<div className="react__chat__header_logo">
				<img src={icon_robot} />
			</div>
			<div className="react__chat__header_title">
				<h2 className="react__chat__header_title-text">Чат</h2>
			</div>
		</div>
	)
}

export default Chat;
