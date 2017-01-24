import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router';

import App from './components/app/module.js';
import Home from './components/home/module.js';
import Login from './components/login/module.js';
import Gears from './components/gears/module.js';
import Signup from './components/signup/module.js';
import Calendar from './components/calendar/module.js';
import Artists from './components/artists/module.js';

const app = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="login" component={Login} />
            <Route path="gears" component={Gears} />
            <Route path="signup" component={Signup} />
            <Route path="artists" component={Artists} />
            <Route path="calendar" component={Calendar} />
            <Redirect from="*" to="/" />
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
