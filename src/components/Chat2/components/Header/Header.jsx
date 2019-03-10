import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './Header.less';

const defaultText = 'Есть вопросы? Задавайте!';

const propTypes = {
    action: PropTypes.bool,
    activeChat: PropTypes.func,
    disactiveChat: PropTypes.func
};

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
            <Fragment>
                <div className="r-chat__header_close" onClick={disactiveChat}></div>
                <div className="r-chat__header_text">
                    <p className="r-chat__header_title">Напишите нам</p>
                    <p className="r-chat__header_title-small">и мы ответим на все ваши вопросы</p>
                </div>
            </Fragment>
        );
    }
}

Header.propTypes = propTypes;

export default Header;
