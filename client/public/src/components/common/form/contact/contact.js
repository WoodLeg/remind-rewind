import React from 'react';
import { observer, inject } from 'mobx-react';

import form from './form.js';


@observer
export default class ContactFormComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <form onSubmit={form.onSubmit} className="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 form__contact">
                <div className="form-group">
                    <input
                        {...form.$('email').bind()}
                        className={"form-control form__contact-email " + (
                            form.$('email').error ? 'has-error' : form.$('email').isValid ? 'is-valid' : '')}
                    />
                    <label className={"form__contact-label " + (!form.$('email').isPristine ? 'stuck': '')}>{form.$('email').label}</label>
                    <p className="col-xs-12 form__contact-errors-email">{form.$('email').error}</p>
                </div>
                <div className="form-group">
                    <textarea {...form.$('message').bind()} className={"form-control form__contact-message " + (form.$('message').error ? 'has-error': form.$('message').isValid ? 'is-valid' : '')}></textarea>
                    <label className={"form__contact-label " + (!form.$('message').isPristine ? 'stuck': '')}>{form.$('message').label}</label>
                    <p className="col-xs-12 form__contact-errors-message">{form.$('message').error}</p>
                </div>
                <p className="col-xs-12 form__contact-errors-generic">{form.error}</p>
                <button disabled={!form.isValid} type="submit"  className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 form__contact-btn">Envoyer</button>
            </form>
        )
    }
}
