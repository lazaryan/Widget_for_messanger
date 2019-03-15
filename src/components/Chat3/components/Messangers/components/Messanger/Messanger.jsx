import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Messanger.less';

const propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['link', 'email', 'phone']),
    logo: PropTypes.string,
    url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            href: PropTypes.string.isRequired
        })
    ]).isRequired,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            message: PropTypes.string,
            name: PropTypes.string
        })
    ]),
    actionBlock: PropTypes.func,
    active: PropTypes.bool,
    action: PropTypes.func
};

const defaultProps = {
    name: 'messanger',
    type: 'link',
    logo: '',
    url: '#',
    actionBlock: () => {},
    active: false,
    action: () => {},
    text: ''
};

const dictionary = {
    email: 'mailto',
    phone: 'tel'
};

class Messanger extends Component {
    render () {
        const {
            name,
            type,
            logo,
            active
        } = this.props;

        return (
            <div className={`rChat__messanger
                ${active && type === 'link' ? 'rChat__messanger_active' : ''}`}
            >
                {type !== 'link' || this.is_phone() ?
                    <a href={this.renderURL()} className="rChat__messanger_logo-body">
                        {logo ?
                            <img src={logo} className="rChat__messanger_logo" />
                            : null
                        }
                    </a>
                    :
                    <div
                        className="rChat__messanger_logo-body"
                        onClick={this.followTheLink}
                    >
                        {logo ?
                            <img src={logo} className="rChat__messanger_logo" />
                            : null
                        }
                    </div>
                }
                <p className="rChat__messanger_text">{name}</p>
            </div>
        );
    }

    renderURL = () => {
        const {
            type,
            text
        } = this.props;
        let {url} = this.props;

        if (text) {
            if (typeof url === 'string') {
                url = {
                    href: url,
                    [text.name]: text.message
                };
            } else {
                url[text.name] = text.message;
            }
        }

        if ((type === 'email' || type === 'phone') && typeof url === 'string') {
            return `${dictionary[type]}:${url}`;
        }

        if (type === 'link') {
            if (typeof url === 'string') {
                return url;
            } else if (typeof url === 'object') {
                const {href, ...props} = url;

                let link = href;

                for (const el in props) {
                    if (el) {
                        link += `${el}=${this.textNotSpase(props[el])}\&`;
                    }
                }

                return link;
            }
        }

        return '';
    }

    followTheLink = () => {
        const {actionBlock, action, name} = this.props;

        action(name);
        actionBlock(this.renderURL());
    }

    textNotSpase = (text = '') => text.replace(/[\s\uFEFF\xA0]/g, '%20')

    is_phone = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}

Messanger.propTypes = propTypes;
Messanger.defaultProps = defaultProps;

export default Messanger;