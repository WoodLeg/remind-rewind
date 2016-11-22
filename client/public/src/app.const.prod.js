(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('PROD', true)
    .constant('FACEBOOK_APP', '169155673554740')
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
