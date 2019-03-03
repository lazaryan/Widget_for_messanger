import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';

import './ErrorBlock.less';

const propTypes = {
    activeMessangers: PropTypes.func
};

class ErrorBlock extends Component {
    render () {
        const {activeMessangers} = this.props;

        return (
            <div className="r-chat__error-block">
                <div className="r-chat__error-block_header">
                    <h2 className="r-chat__error-block_title">
                        Произошда ошибка соединения!
                    </h2>
                    <p className="r-chat__error-block_text">
                        Выбирете один из вариантов отправки сообщения:
                    </p>
                </div>
                <Button onClick={activeMessangers}>Мессенджер</Button>
                <Button >Почта</Button>
            </div>
        );
    }
}

ErrorBlock.propTypes = propTypes;

export default ErrorBlock;
