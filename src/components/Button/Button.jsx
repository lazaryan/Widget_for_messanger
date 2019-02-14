import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '_styles/Button.less';

class Button extends Component {
	render () {
		return (
			<button className="react-button" onClick={this.props.onClick}>
				{this.props.children}
			</button>
		)
	}
}

function defaultChildren () {
	return (
		<span className="react-button__default-children"></span>
	)
}

const propTypes = {
	children: PropTypes.node
}

const defaultProps = {
	children: defaultChildren()
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
