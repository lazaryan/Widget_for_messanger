import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Messanger.less';

const propTypes = {
    name: PropTypes.string,
    type: PropTypes.oneOf(['link', 'email', 'phone']),
    logo: PropTypes.string,
    url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            href: PropTypes.string.isRequired
        })
    ]).isRequired
};

const defaultProps = {
    name: 'messanger',
    type: 'link',
    logo: '',
    url: '#'
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
            logo
        } = this.props;

        return (
            <div className="rChat__messanger">
                {type !== 'link' ?
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
            url
        } = this.props;

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
        document.location.href = this.renderURL();
    }

    textNotSpase = (text = '') => text.replace(/[\s\uFEFF\xA0]/g, '%20');
}

Messanger.propTypes = propTypes;
Messanger.defaultProps = defaultProps;

export default Messanger;
