import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Textarea.less';

class Textarea extends Component {
    render () {
        const {name, placeholder, value, onChange} = this.props;

        return (
            <div className="r-chat__textarea-form">
                <textarea
                    className="r-chat__textarea"
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                />
            </div>
        );
    }
}

export default Textarea;
