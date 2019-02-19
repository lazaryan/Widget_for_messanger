import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '_styles/Link.less';

import Button from '_components/Button';

const dictionary = {
    email: 'mailto:',
    phone: 'tel:'
};

class Link extends Component {
    render () {
        return (
            <div className="message-block__link">
                <div className="message-block__link-image-block">
                    <button
                        className="message-block__link-image"
                        onClick={this.toLink}
                    >
                        {this.image()}
                    </button>
                </div>
                <div className="message-block__link-body">
                    <p className="message-block__link-title">{this.props.title}</p>
                </div>
            </div>
        );
    }

    toLink = () => {
        const target = this.props.type === 'link' ? '_blank' : false;

        if (target) {
            this.showActionMenu();
        } else {
            document.location.href = this.renderURL();
        }
    }

    image = () => {
        if (!this.props.icon) {
            return null;
        }

        return (
            <img className="message-block__link-logo" src={ this.props.icon } />
        );
    }

    renderURL = () => {
        const {type, url} = this.props;

        if (!href) {
            return '';
        }

        const props = Object.keys(url).filter(el => el !== 'href');

        let link = type === 'link' ? url.href : dictionary[type] + url.href;

        props.forEach(item => {
            link += url[item] ? `${item}=${this.textNotSpase(url[item])}\&` : '';
        });

        return link;
    }

    textNotSpase = (text = '') => text.replace(/[\s\uFEFF\xA0]/g, '%20');

    showActionMenu = () => {
        this.props.showActionMenu({
            url: this.renderURL(),
            qr_icon: this.props.qr_icon
        });
    }
}

const propTypes = {
    url: PropTypes.object,
    title: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.oneOf(['email', 'phone', 'link'])
};

const defaultProps = {
    title: '',
    icon: '',
    url: {
        href: '#'
    },
    type: 'link'
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
