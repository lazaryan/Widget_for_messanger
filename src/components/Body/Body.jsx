import React, {Component} from 'react';

import '_styles/Body.less';

class Body extends Component {
    render() {
        return (
            <div className="message-block__links">
                {this.props.children}
            </div>
        );
    }
}

export default Body;
