import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Input.less';

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
    maxlength: 200
};

class Input extends Component {
    render () {
        const {
            type,
            placeholder,
            required,
            name,
            onChange,
            value,
            maxlength
        } = this.props;

        return (
            <div className="rChat__input-block">
                <input
                    className="rChat__input"
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

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
