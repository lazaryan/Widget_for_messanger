import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '_styles/Button.less';

class Button extends Component {
    render () {
        return (
            <button className="react-action" onClick={this.props.onClick}>
                {this.props.children || 'Done'}
            </button>
        );
    }
}

const propTypes = {
    children: PropTypes.node
};

Button.propTypes = propTypes;

export default Button;
