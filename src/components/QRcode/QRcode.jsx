import React, {Component} from 'react';

import Button from '_components/Button';

import '_styles/QRcode.less';

class QRcode extends Component {
    render () {
        const {qr_icon, url} = this.props.data;
        const {close} = this.props;

        return (
            <div className="r-chat__link-menu">
                <header className="r-chat__link-menu_header">
                    <button
                        className="r-chat__link-menu_close"
                        onClick={close}
                    >
                        <span className="r-chat__link-menu_close-line"></span>
                    </button>
                </header>
                <div className="r-chat__link-menu_qr-code">
                    <img src={qr_icon} className="r-chat__link-menu_qr-code-image"/>
                </div>
                <div className="r-chat__link-menu_action-block">
                    <a
                        href={url}
                        target="_blank"
                        style={{textDecoration: 'none'}}
                    >
                        <Button>Перейти</Button>
                    </a>
                </div>
            </div>
        );
    }
}

export default QRcode;
