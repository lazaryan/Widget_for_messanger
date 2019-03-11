import React, {Component} from 'react';

import Header from './components/Header';
import Form from './components/Form';

import './Chat3.less';

class Chat3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionChat: false,
            actionForm: false
        };
    }

    render () {
        const {actionChat, actionForm} = this.state;

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
                            actionForm={actionForm}
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
}

export default Chat3;
