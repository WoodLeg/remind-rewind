import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router';

import App from './components/app/module.js';
import Home from './components/home/module.js';
import Login from './components/login/module.js';
import RedirectTo from './components/redirect/module.js';

const app = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="login" component={Login} />
            <Route path="*" component={RedirectTo} />
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
