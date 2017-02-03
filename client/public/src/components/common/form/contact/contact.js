import React from 'react';
import { observer, inject } from 'mobx-react';

import form from './form.js';
import MobxReactFormDevTools from 'mobx-react-form-devtools';

MobxReactFormDevTools.register({form});
MobxReactFormDevTools.select('form');

MobxReactFormDevTools.open(true);

@observer
export default class ContactFormComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <form onSubmit={form.onSubmit} className="col-xs-12 col-sm-6 col-sm-offset-3 form__contact">
                <div className="form-group">
                    <input
                        {...form.$('email').bind()}
                        className={"form-control form__contact-email " + (
                            form.$('email').error ? 'has-error' : form.$('email').isValid ? 'is-valid' : '')}
                    />
                    <label className={"form__contact-email-label " + (!form.$('email').isPristine ? 'stuck': '')}>{form.$('email').label}</label>
                    <p className="col-xs-12 form__contact-errors-email">{form.$('email').error}</p>
                </div>
                <p className="col-xs-12 form__contact-errors-generic">{form.error}</p>
                <button disabled={!form.isValid} type="submit" onClick={form.onSubmit} className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 form__contact-btn">Submit</button>
                <MobxReactFormDevTools.UI />
            </form>
        )
    }
}


// <div className="form-group">
// <textarea placeholder="Message"className="form-control form__contact-message" id="exampleTextarea"></textarea>
// </div>
