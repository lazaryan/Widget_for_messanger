import React, {Component} from 'react';
import axios from 'axios';

import Input from '_components/Input';

import './UserForm.less';

const listInputs = [
    {name: 'name', title: 'Введите имя'},
    {name: 'phone', title: 'Введите телефон'}
];

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
        const {changeUserInfo, data} = this.props;

        return (
            <div className="r-chat__user-form"
                onMouseEnter={() => this.changeStatusForm(true)}
                onMouseLeave={() => this.changeStatusForm(false)}
            >
                <div className={`r-chat__user-form_body ${action ? 'r-chat__user-form_body_active' : ''}`}>
                    {listInputs.map(({name, title}, index) =>
                        <Input key={`${name}-${index}`}
                            name={name}
                            title={title}
                            onChange={this.changeInfo}
                            value={data}
                        />
                    )}
                </div>
                <div className="r-chat__user-form_footer" onClick={this.handleSubmit}>Отправить на почту</div>
            </div>
        );
    }

    changeStatusForm = state => {
        this.setState({
            action: state
        });
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

        console.log(this.state);

        axios.post('./mail.php', {
            name: this.state.name,
            email: this.state.email
        })
            .then(res => {
                console.log('Send');
            })
            .catch(error => {
                console.warn(error);
            });
    }
}

export default UserForm;
