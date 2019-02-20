import React, {Component} from 'react';

import './Input.less';

class Input extends Component {
    render () {
        const {name, title, value, onChange} = this.props;

        return (
            <div className="r-chat__input-form">
                <input type="text"
                    className="r-chat__input"
                    placeholder={title}
                    name={name}
                    onChange={onChange}
                    value={value[name]}
                />
            </div>
        );
    }
}

export default Input;
