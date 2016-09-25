import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';


class DummyComponent extends React.Component {

    constructor() {
        super();

    }

    componentWillMount() {


    }

    render() {
        return(
            <div className="col-xs-12">
                <h1> Start to code bro ! </h1>
            </div>
        );
    }

}

jQuery(function() {
    ReactDOM.render(
        <DummyComponent />,
        document.getElementById('dummy-component')
    );
})
