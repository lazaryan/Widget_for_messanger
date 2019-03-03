import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Button.less';

class Button extends Component {
    render () {
        const {onClick, children} = this.props;

        return (
            <div className="r-chat__button-block">
                <button className="r-chat__button" onClick={onClick}>
                    {children || 'Done'}
                </button>
            </div>
        );
    }
}

const propTypes = {
    children: PropTypes.node
};

Button.propTypes = propTypes;

export default Button;
