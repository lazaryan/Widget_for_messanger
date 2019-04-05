import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './Header.less';

const propTypes = {
    changeActionChat: PropTypes.func,
    actionChat: PropTypes.bool
};

const defaultProps = {
    changeActionChat: () => {},
    actionChat: false
};

class Header extends Component {
    render () {
        const {actionChat, changeActionChat} = this.props;

        return (
            <div
                className={`rChat__header ${actionChat ? 'rChat__header_active' : 'rChat__header_disactive'}`}
                onClick={!actionChat ? changeActionChat : () => {}}
            >
                {actionChat ? this.activeBlock(changeActionChat) : this.disactiveBlock()}
            </div>
        );
    }

    disactiveBlock = () => (
        <p className="rChat__header-title">Есть вопросы? Задавайте!</p>
    )

    activeBlock = func => (
        <Fragment>
            <div
                className="rChat__header-close"
                onClick={func}
            ></div>
            <div className="rChat__header-block">
                <p className="rChat__header-title">Напишите нам</p>
                <p className="rChat__header-title_small">и мы ответим на все ваши вопросы!</p>
            </div>
        </Fragment>
    )
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
