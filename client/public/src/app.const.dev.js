(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('PROD', false)
    .constant('API', {
        URL: 'http://192.168.15.94:8080',
        ENDPOINT: {
            SIGNUP:     '/signup',
            SIGNIN:     '/users/signin',
            SIGNOUT:    '/signout',
            GRAPHQL:    '/graphql'
        }
    });

}());
