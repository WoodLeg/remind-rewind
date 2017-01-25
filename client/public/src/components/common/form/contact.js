import React from 'react';


export default class ContactFormComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (

            <form className="col-xs-12 col-sm-6 col-sm-offset-3">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input  type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleTextarea">Example textarea</label>
                    <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
                </div>
                <button type="submit" className="col-xs-12 btn btn-primary">Submit</button>
            </form>
        )
    }
}
