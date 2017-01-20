import React from 'react';

export default class HomeComponent extends React.Component {

    constructor() {
        super();

    }

    componentWillMount() {

    }

    render() {
        return(
            <div>
                <div className="col-xs-12">
                    <h1> Home component!! </h1>
                </div>
                <div className="col-xs-12">
                    <h1>Deaf Experience ! </h1>
                </div>
                <div className="col-xs-12">
                    <h1>Gears available</h1>
                </div>
            </div>
        );
    }
}
