import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './Blocklink.less';

const propTypes = {
    close: PropTypes.func,
    action: PropTypes.bool,
    url: PropTypes.string
};

const defaultProps = {
    close: () => {},
    action: false,
    url: '#'
};

class Blocklink extends Component {
    render () {
        const {
            close,
            action,
            url
        } = this.props;

        return (
            <div className={
                `rChat__block-link
                ${action ? 'rChat__block-link_active' : 'rChat__block-link_disactive'}`
            }>
                {!action ? null :
                    <Fragment>
                        <header className="rChat__block-link_header">
                            <div
                                className="rChat__block-link_close"
                                onClick={close}
                            ></div>
                        </header>
                        <div className="rChat__block-link_body">
                            <a href={url} target="_blank" className="rChat__block-link_link">Перейти</a>
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}

Blocklink.propTypes = propTypes;
Blocklink.defaultProps = defaultProps;

export default Blocklink;
