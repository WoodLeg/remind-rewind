(function() {
    'use strict';

    angular
    .module('remindRewind')
    .constant('HAPPYHOUR', true)
    .constant('LIVESHARE_LIMIT_PARTICIPANTS', 5)
    .constant('ANALYTICS', {
        SEGMENT: {
            KEY: {
                WRITE: 'qF2oigsj9A0x9ErhHciNwezp0y9xzgti'
            }
        }
    })
    .constant('API', {
        URL: 'http://localhost:8000',
        VERSION: {
            PREFIX:         '/v1'
        },
        ENDPOINT: {
            SIGNUP:     '/users/signup',
            SIGNIN:     '/users/signin',
            SIGNOUT:    '/users/signout',
            ACTIVATE:   '/accounts/activation',
            RESET: {
                REQUEST :  '/users/password/request',
                PREFIX :   '/users/password/reset'
            },
            MAILER: {
                ACTIVATION:     '/accounts/activation/request',
                RESET:          '/users/password/request'
            },
            VMS: {
                TEMPLATES : '/templates',
                INSTANCES : '/instances'
            },
            APPS : '/apps',
            DEMO : '/demo',
            ACCOUNTS: {
                GETALL : '/accounts',
                INVITES: '/accounts/invites'
            },
            USER: {
                UPDATE: '/users',
                PASSWORD: '/users/password'
            },
            RECIPES: '/recipes'
        }
    });

}());
