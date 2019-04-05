import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Textarea.less';

const propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    maxlength: PropTypes.number
};

const defaultProps = {
    type: 'text',
    placeholder: '',
    required: false,
    name: '',
    onChange: () => {},
    value: '',
    maxlength: 400
};

class Textarea extends Component {
    render () {
        const {
            type,
            placeholder,
            required,
            onChange,
            name,
            value,
            maxlength
        } = this.props;

        return (
            <div className="rChat__textarea-block">
                <textarea
                    className="rChat__textarea"
                    type={type}
                    required={required ? 'required' : ''}
                    placeholder={placeholder + (required ? '*' : '')}
                    name={name}
                    onChange={onChange}
                    value={value}
                    maxLength={maxlength}
                />
            </div>
        );
    }
}

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
