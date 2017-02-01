import React from 'react';

export default class ContactFormComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (

            <form className="col-xs-12 col-sm-6 col-sm-offset-3 form__contact">
                <div className="form-group">
                    <input  type="email"
                        className="form-control form__contact-email"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <textarea placeholder="Message"className="form-control form__contact-message" id="exampleTextarea"></textarea>
                </div>
                <button type="submit" className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 form__contact-btn">Submit</button>
            </form>
        )
    }
}
