import Validatorjs from 'validatorjs';
import MobxReactFrom from 'mobx-react-form';
import 'whatwg-fetch';

// Validatorjs.useLang('fr');

const plugins = { dvr: Validatorjs };

const fields = [{
    name: 'email',
    label: 'Email',
    type: 'email',
    rules: 'required|email|string|between:5,25'
}, {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    rules: 'required|string|between:20,250'
}];

class Form extends MobxReactFrom{

    onSubmit(form){
        console.log('SUBMITTED BEACH: ', form.values());
    }

    onSuccess(form) {
        fetch('http://localhost:8000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: form.values().email,
            message: form.values().message,
          })
        }).then((response) => {
          return response.json();
        }).then((json) => {
          console.log('Succes: ', json);
        }).catch((reason) => {
          console.log('Failed: ', reason);
        });
    }

    onError(form) {
        console.log('All form errors: ', form.errors());
        form.invalidate('FAILED NOOB !');
    }

}

export default new Form( { fields }, { plugins } );
