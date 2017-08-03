import React from 'react';
import { observer, inject } from 'mobx-react';

import form from './form.js';
import { Spinner } from '../../spinner/module.js';
import store from './store.js';

@observer
export default class ContactFormComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <form onSubmit={form.onSubmit}
              className={'form__contact ' + this.props.grid + ' ' + this._formSuccess()}
            >
                <h3 id="contact-us" className="form__contact-title">Pour me contacter</h3>
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

                <div className="col-xs-12">
                    {this._renderSpinner()}
                </div>
            </form>
        )
    }

    _formSuccess() {
      console.log(store.formData);
      return store.formData ? 'success' : 'fail';
    }
    _renderSpinner() {
      if (store.requesting) {
        return (
          <Spinner></Spinner>
        )
      } else {
          return (
              <button disabled={!form.isValid} type="submit"  className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 form__contact-btn">Envoyer</button>
        )
      }

    }
}
