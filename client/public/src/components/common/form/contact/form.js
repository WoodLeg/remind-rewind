import Validatorjs from 'validatorjs';
import MobxReactFrom from 'mobx-react-form';

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
        console.log('Form values: ', form.values());
    }

    onError(form) {
        console.log('All form errors: ', form.errors());
        form.invalidate('FAILED NOOB !');
    }

}

export default new Form( { fields }, { plugins } );
