(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('PROD', false)
    .constant('FACEBOOK_APP', '169886106815030')
    .constant('API', {
        URL: 'http://192.168.1.18:8080',
        ENDPOINT: {
            SIGNUP:     '/signup',
            SIGNIN:     '/users/signin',
            SIGNOUT:    '/signout',
            GRAPHQL:    '/graphql'
        }
    });

}());
