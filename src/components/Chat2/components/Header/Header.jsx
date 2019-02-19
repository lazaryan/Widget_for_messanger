import React, {Component} from 'react';

import icon_chat from './icons/robot.svg';
import './Header.less';

const defaultText = 'Есть вопросы? Задавайте!';

class Header extends Component {
    render () {
        const {action, activeChat} = this.props;

        return (
            <div className={`r-chat__header ${!action ? 'r-chat__header_disactive' : ''}`}
                onClick={activeChat}
            >
                {!action ? this.defaultTitle() : this.actionHeader()}
            </div>
        );
    }

    defaultTitle = () => (
        <p className="r-chat__header_title-default">{defaultText}</p>
    )

    actionHeader = () => {
        const {disactiveChat} = this.props;

        return (
            <div className="r-chat__header_active">
                <div className="r-chat__header_icon">
                    <img src={icon_chat} />
                </div>
                <div className="r-chat__header_body">
                    <div className="r-chat__header_text">
                        Чат Робот
                    </div>
                    <div className="r-chat__header_close" onClick={disactiveChat}></div>
                </div>
            </div>
        );
    }
}

export default Header;
