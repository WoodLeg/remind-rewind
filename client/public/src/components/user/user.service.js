(function() {
    'use strict';

    angular
        .module('remindRewind.user')
        .service('userService', UserService);

    UserService.$inject = ['$q', '$http', '$log', 'API'];

    function UserService($q, $http, $log, API) {
        this.signin = function(payload) {
            $log.debug('Signin attempt');
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.SIGNIN, payload);
        };

        this.signup = function(payload) {
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.SIGNUP, payload);
        };

        this.signout = function() {
            $log.debug('Signing you out...');
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.SIGNOUT, '');
        };

        this.activateAccount = function(token) {
            $log.debug('activating account: ', token);
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.ACTIVATE, token);
        };

        this.resendActivation = function() {
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.MAILER.ACTIVATION, '');
        };

        this.checkEmail = function(email){
            var deferred = $q.defer();
            var response = {
                success: true,
                data: {
                    email: email
                }
            };

            deferred.resolve(response);

            return deferred.promise;
        };

        // Added because of new API Design
        this.requestResetPassword = function(payload){
            $log.debug('Request a reset password');
            return $http.post(API.URL + API.VERSION.PREFIX + API.ENDPOINT.RESET.REQUEST, payload);
        };

        this.verifyResetToken = function(token) {
            $log.debug('Identifying you now with the following token: ', token);
            return $http.get(API.URL + API.VERSION.PREFIX + API.ENDPOINT.RESET.PREFIX + '/' + token);
        };

        this.updatePassword = function(updatePasswordPayload) {
            $log.debug('Updating your password...');
            return $http.put(API.URL + API.VERSION.PREFIX + API.ENDPOINT.RESET.PREFIX, updatePasswordPayload);
        };
    }
})();
