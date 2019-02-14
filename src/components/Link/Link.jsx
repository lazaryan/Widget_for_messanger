import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '_styles/Link.less';

const dictionary = {
	email: 'mailto:',
	phone: 'tel:'
}

class Link extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="message-block__link">
				<div className="message-block__link-image-block">
					<a  className="message-block__link-image" 
						href={this.renderURL()} 
						target={this.props.type === 'link' ? '_blank' : false}
					>
						{this.Image()}
					</a>
				</div>
				<div className="message-block__link-body">
					<p className="message-block__link-title">{this.props.title}</p>
				</div>
			</div>
		)
	}

	Image () {
		if (!this.props.icon) return null;

		return (
			<img className="message-block__link-logo" src={this.props.icon} />
		)
	}

	renderURL () {
		if (!this.props.url['href']) return '';

		let props = Object.keys(this.props.url).filter((el) => el !== 'href');

		let link = this.props.type === 'link' 
						? this.props.url['href'] 
						: dictionary[this.props.type] + this.props.url['href'];

		props.forEach((item) => {
			link += this.props.url[item] ? `${item}=${this.textNotSpase(this.props.url[item])}\&` : '';
		});

		return link;
	}

	textNotSpase (text = '') {
		return text.replace(/[\s\uFEFF\xA0]/g, '%20');
	}
}

const propTypes = {
	url: PropTypes.object,
	title: PropTypes.string,
	icon: PropTypes.string,
	type: PropTypes.oneOf(['email', 'phone', 'link'])
}

const defaultProps = {
	title: '',
	icon: '',
	url: {
		href: '#'
	},
	type: 'link'
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
