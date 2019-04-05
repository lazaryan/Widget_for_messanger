import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './Blocklink.less';

const propTypes = {
    close: PropTypes.func,
    sendMessage: PropTypes.func,
    action: PropTypes.bool,
    url: PropTypes.string,
    qr: PropTypes.string,
    name: PropTypes.string
};

const defaultProps = {
    close: () => {},
    sendMessage: () => {},
    action: false,
    url: '#',
    qr: '',
    name: ''
};

class Blocklink extends Component {
    render () {
        const {
            close,
            action,
            url,
            qr,
            name
        } = this.props;

        return (
            <div className={
                `rChat__block-link
                ${action ? 'rChat__block-link_active' : 'rChat__block-link_disactive'}`
            }>
                {!action ? null :
                    <Fragment>
                        <div className="rChat__block-link_body">
                            {!qr ? null :
                                <img src={qr} className="rChat__block-link_qr-code" />
                            }
                            {!url ? null :
                                <a
                                    href={url}
                                    target="_blank"
                                    className="rChat__block-link_link"
                                    onClick={this.openLink}
                                >Перейти</a>
                            }
                        </div>
                        <div
                            className="rChat__block-link_close"
                            onClick={close}
                        >Свернуть</div>
                    </Fragment>
                }
            </div>
        );
    }

    openLink = e => {
        const {sendMessage, name} = this.props;

        sendMessage({message: name, to: 'user'}, '', 'messenger');
    }
}

Blocklink.propTypes = propTypes;
Blocklink.defaultProps = defaultProps;

export default Blocklink;
