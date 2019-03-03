import React, {Component, Fragment} from 'react';

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
        <Fragment>
            <p className="r-chat__header_title-default">{defaultText}</p>
            <div className="r-chat__header_close"></div>
        </Fragment>
    )

    actionHeader = () => {
        const {disactiveChat} = this.props;

        return (
            <Fragment>
                <p className="r-chat__header_title">Напишите нам</p>
                <p className="r-chat__header_title-small">и мы ответим на все ваши вопросы</p>
                <div className="r-chat__header_close" onClick={disactiveChat}></div>
            </Fragment>
        );
    }
}

export default Header;
