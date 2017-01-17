import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {Router, Route, browserHistory} from 'react-router';

import Menu from './components/menu/module.js';
import Home from './components/home/module.js';

const app = (
    <Router history={browserHistory}>
        <Route path="/" component={Menu}>
            <Route path="home" component={Home} />
        </Route>
    </Router>
)

jQuery(function() {
    ReactDOM.render(
        app,
        document.getElementById('remindrewind-component'),
        function(){
            console.timeEnd('react-app')
        }
    );
})
