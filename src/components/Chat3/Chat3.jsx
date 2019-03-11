import React, {Component} from 'react';

import Header from './components/Header';
import Form from './components/Form';

import './Chat3.less';

class Chat3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionChat: false,
            actionForm: false,
            form: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        };
    }

    render () {
        const {
            actionChat,
            actionForm,
            form
        } = this.state;

        return (
            <div className="rChat">
                <Header
                    changeActionChat={this.changeActionChat}
                    actionChat={actionChat}
                />
                <div className={`rChat__body ${actionChat ? 'rChat__body_action' : ''}`}>
                    {!actionChat ? null :
                        <Form
                            changeActionForm={this.changeActionForm}
                            changeInfoForm={this.changeInfoForm}
                            actionForm={actionForm}
                            clearForm={this.clearForm}
                            data={form}
                        />
                    }
                </div>
            </div>
        );
    }

    changeActionChat = () => {
        this.setState(({actionChat}) => ({
            actionChat: !actionChat
        }));
    }

    changeActionForm = () => {
        this.setState(({actionForm}) => ({
            actionForm: !actionForm
        }));
    }

    changeInfoForm = ({target: {name, value}}) => {
        this.setState(({form}) => ({
            form: {
                ...form,
                [name]: value
            }
        }));
    }

    clearForm = () => {
        this.setState({
            form: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        });
    }
}

export default Chat3;
