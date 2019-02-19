import React, {Component} from 'react';

import Header from './components/Header';
import UserForm from './components/UserForm';

import './Chat2.less';

class Chat2 extends Component {
    state = {
        action: false
    }

    render () {
        const {action} = this.state;

        return (
            <div className="r-chat">
                <Header activeChat={this.activeChat}
                    disactiveChat={this.disactiveChat}
                    action={action}
                />
                {!action ? null :
                    <div className="r-chat__body">
                        <UserForm />
                    </div>
                }
            </div>
        );
    }

    activeChat = () => {
        const {action} = this.state;

        if (!action) {
            this.setState({
                action: true
            });
        }
    }

    disactiveChat = () => {
        this.setState({
            action: false
        });
    }
}

export default Chat2;
