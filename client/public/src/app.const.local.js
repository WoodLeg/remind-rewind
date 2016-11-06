(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('API', {
        URL: 'http://localhost:8080',
        ENDPOINT: {
            SIGNUP:     '/signup',
            SIGNIN:     '/users/signin',
            SIGNOUT:    '/signout',
            GRAPHQL:    '/graphql'
        }
    });

}());
