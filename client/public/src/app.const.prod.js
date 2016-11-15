(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('PROD', true)
    .constant('API', {
        URL: 'http://api.remind-rewind.com',
        ENDPOINT: {
            SIGNUP:     '/signup',
            SIGNIN:     '/users/signin',
            SIGNOUT:    '/signout',
            GRAPHQL:    '/graphql'
        }
    });

}());
