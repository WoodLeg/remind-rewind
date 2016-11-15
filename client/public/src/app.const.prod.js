(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('API', {
        URL: 'http://api.remind-rewind.com:81',
        ENDPOINT: {
            SIGNUP:     '/signup',
            SIGNIN:     '/users/signin',
            SIGNOUT:    '/signout',
            GRAPHQL:    '/graphql'
        }
    });

}());
