import React, {Component} from 'react';

import Input from '_components/Input';

import './UserForm.less';

const listInputs = [
    {name: 'name', title: 'Введите имя'},
    {name: 'phone', title: 'Введите телефон'}
];

class UserForm extends Component {
    state = {
        action: false
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
                            onChange={changeUserInfo}
                            value={data}
                        />
                    )}
                </div>
                <div className="r-chat__user-form_footer">Отправить на почту</div>
            </div>
        );
    }

    changeStatusForm = state => {
        this.setState({
            action: state
        });
    }
}

export default UserForm;
