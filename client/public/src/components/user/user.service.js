(function() {
    'use strict';

    angular
        .module('remindRewind.user')
        .service('userService', UserService);

    UserService.$inject = ['$q', '$http', '$log', 'API'];

    function UserService($q, $http, $log, API) {
        this.signin = function(payload) {
            $log.debug('Signin attempt', payload);
            return $http.post(API.URL + API.ENDPOINT.SIGNIN, payload);
        };

        this.signup = function(payload) {
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.SIGNUP, payload);
        };

        this.signout = function() {
            $log.debug('Signing you out...');
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.SIGNOUT, '');
        };

    }
})();
