import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import MenuComponent from './components/menu/menu.js';

class DummyComponent extends React.Component {

    constructor() {
        super();

    }

    componentWillMount() {


    }

    render() {
        return(
            <MenuComponent />
        );
    }

}

jQuery(function() {
    ReactDOM.render(
        <DummyComponent />,
        document.getElementById('dummy-component')
    );
})
