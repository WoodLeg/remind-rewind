import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';


class RemindrewindComponent extends React.Component {

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
        <RemindrewindComponent />,
        document.getElementById('remindrewind-component')
    );
})
