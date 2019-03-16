import React, {Component, Fragment} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Input from './components/Input';
import Textarea from './components/Textarea';

import './Form.less';

const propTypes = {
    changeActionForm: PropTypes.func,
    changeInfoForm: PropTypes.func,
    clearForm: PropTypes.func,
    actionForm: PropTypes.bool,
    type: PropTypes.oneOf(['Error', 'Form']),
    data: PropTypes.object
};

const defaultProps = {
    changeActionForm: () => {},
    changeInfoForm: () => {},
    clearForm: () => {},
    actionForm: false,
    type: 'Form',
    data: {}
};

class Form extends Component {
    constructor(props) {
        super(props);

        const {
            actionForm,
            changeActionForm,
            changeInfoForm,
            type
        } = props;

        if (type === 'Error' && !actionForm) {
            changeActionForm();
        }

        this.state = {
            resolutionSend: false
        };
    }

    render () {
        const {
            actionForm,
            changeActionForm,
            changeInfoForm,
            type,
            data
        } = this.props;

        return (
            <div className={`rChat__form ${type === 'Error' ? 'rChat__form_error' : ''}`}>
                <div className={`rChat__form_body ${actionForm ? 'rChat__form_body-action' : ''}`}>
                    {!actionForm ? null :
                        <form>
                            {type === 'Form' ? this.defaultTitile() : this.errorTitile()}
                            <Textarea
                                placeholder="Ваше сообщение"
                                required={true}
                                name="message"
                                onChange={e => this.changeInfo(e, data, changeInfoForm)}
                                value={data.message || ''}
                            />
                            <Input
                                placeholder="Ваше имя"
                                name="name"
                                onChange={e => this.changeInfo(e, data, changeInfoForm)}
                                value={data.name || ''}
                            />
                            <Input
                                placeholder="Ваш телефон"
                                name="phone"
                                onChange={e => this.changeInfo(e, data, changeInfoForm)}
                                value={data.phone || ''}
                            />
                            <Input
                                placeholder="Ваш e-mail"
                                required={true}
                                name="email"
                                onChange={e => this.changeInfo(e, data, changeInfoForm)}
                                value={data.email || ''}
                            />
                            <button
                                className="rChat__form_send-form"
                                onClick={e => this.sendForm(e, data)}
                            >Отправить</button>
                        </form>
                    }
                </div>
                {type !== 'Error' ?
                    <div
                        className='rChat__form_action'
                        onClick={changeActionForm}
                    >
                        <p className="rChat__form_action-text">
                            {!actionForm ? 'Отправить письмо' : 'Свернуть'}
                        </p>
                    </div>
                    : null
                }
            </div>
        );
    }

    defaultTitile = () => (
        <p className="rChat__form_prev-text">
            Оставьте свое сообщение в этой форме, мы получим его на e-mail и обязательно ответим!
        </p>
    )

    errorTitile = () => (
        <p className="rChat__form_prev-text">
            На сервере произошла ошибка, но вы можете написать нам на почту и мы обязательно ответим!
        </p>
    )

    changeInfo = (e, data, changeInfoForm) => {
        if (data.message && data.email) {
            this.setState({resolutionSend: true});
        } else {
            this.setState({resolutionSend: false});
        }

        changeInfoForm(e);
    }

    sendForm = (e, data) => {
        if (!this.state.resolutionSend) {
            return;
        }

        e.preventDefault();

        const param = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        };

        axios.post('./mail.php', JSON.stringify(param))
            .then(res => {
                console.log('Ваше сообщение отправлено!');
            })
            .catch(error => {
                console.warn(error);
            });

        this.props.clearForm();
    }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
