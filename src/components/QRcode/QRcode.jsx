import React, { Component } from 'react';

import Body from '_components/Body';
import Button from '_components/Button';

import '_styles/QRcode.less';

class QRcode extends Component {
	render () {
		const { qr_icon, url } = this.props.data;
		const { close } = this.props;

		return (
			<Body>
				<header className="react__qr_header">
					<a
						href={url}
						target='_blank'
						onClick={close}
					>
						<Button>Перейти</Button>
					</a>
				</header>
				<div className="react__qr_image-block">
					<div className="react__qr_image-block_wrapper">
						<img src={qr_icon} className="react__qr_image"/>
					</div>
				</div>
			</Body>
		)
	}
}

export default QRcode;
