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
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="submit" className="col-xs-12 btn btn-primary">Submit</button>
            </form>
        )
    }
}
