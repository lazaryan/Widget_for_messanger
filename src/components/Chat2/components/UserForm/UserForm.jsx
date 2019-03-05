import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Input from './components/Input';
import Textarea from './components/Textarea';
import Button from '_components/Button';

import './UserForm.less';

const propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
    changeUserInfo: PropTypes.func,
    data: PropTypes.object
};

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: false,
            name: this.props.data.name,
            phone: this.props.data.phone
        };
    }

    render () {
        const {action} = this.state;
        const {changeUserInfo, data, close} = this.props;

        return (
            <div className="r-chat__user-form">
                <h2 className="r-chat__user-form_title">Введите данные</h2>
                <button
                    className="r-chat__user-form_close"
                    onClick={close}
                >
                    <span className="r-chat__user-form_close-line"></span>
                </button>
                <div className="r-chat__user-form_body">
                    <Input
                        name="name"
                        title="Введите ваше имя"
                        onChange={this.changeInfo}
                        value={data.name || ''}
                    />
                    <Input
                        name="email"
                        title="Введите почту"
                        onChange={this.changeInfo}
                        value={data.email || ''}
                    />
                    <Input
                        name="phone"
                        title="Введите телефон"
                        onChange={this.changeInfo}
                        value={data.phone || ''}
                    />
                    <Textarea
                        className="r-chat__user-form_message"
                        name="message"
                        placeholder="Введите сообщение"
                        onChange={this.changeInfo}
                        value={data.message || ''}
                    />
                </div>
                <Button onClick={this.handleSubmit}>Отправить</Button>
            </div>
        );
    }

    changeInfo = e => {
        const {changeUserInfo} = this.props;

        this.setState({
            [e.target.name]: e.target.value
        });

        changeUserInfo(e);
    }

    handleSubmit = e => {
        e.preventDefault();

        const param = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message
        };

        axios.post('./mail.php', JSON.stringify(param))
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.warn(error);
            });
    }
}

UserForm.propTypes = propTypes;

export default UserForm;
