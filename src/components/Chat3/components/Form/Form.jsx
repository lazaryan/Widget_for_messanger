import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './Form.less';

const propTypes = {
    changeActionForm: PropTypes.func,
    actionForm: PropTypes.bool
};

const defaultProps = {
    changeActionForm: () => {},
    actionForm: false
};

class Form extends Component {
    render () {
        const {actionForm, changeActionForm} = this.props;

        return (
            <div className='rChat__form'>
                <div className={`rChat__form_body ${actionForm ? 'rChat__form_body-action' : ''}`}>
                    {!actionForm ? null :
                        <Fragment>
                            <p className="rChat__form_prev-text">
                                Оставьте свое сообщение в этой форме, мы получим его на e-mail и обязательно ответим!
                            </p>
                        </Fragment>
                    }
                </div>
                <div
                    className='rChat__form_action'
                    onClick={changeActionForm}
                >
                    <p className="rChat__form_action-text">
                        {!actionForm ? 'Отправить письмо' : 'Свернуть'}
                    </p>
                </div>
            </div>
        );
    }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
