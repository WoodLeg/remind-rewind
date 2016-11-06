(function() {
    'use strict';

    angular
    .module('remindRewind.user')
    .factory('userFactory', UserFactory);

    UserFactory.$inject = ['$q', '$localStorage', 'userService', 'userProvider', '$log'];

    function UserFactory($q, $localStorage, userService, userProvider, $log) {
        var user = null;
        var token = null;
        var userFactory = {};

        userFactory.setUser = function(obj) {
            user = obj;
            $localStorage.user = angular.toJson(user);
        };

        userFactory.getUser = function() {
            if (!user) user = angular.fromJson($localStorage.user);
            return user;
        };


        userFactory.setToken = function(jwt) {
            token = jwt;
            $localStorage.userToken = token;
        };

        userFactory.getToken = function() {
            if (!token) token = $localStorage.userToken;
            return token;
        };

        userFactory.signup = function(credentials) {
            // Constructs payload
            var signupPayload = this.getUserFromSignup(credentials);

            // Calls API through service
            return userService.signup(signupPayload).then(function(response){
                return response;
            }, function(reason){
                return $q.reject(reason);
            });
        };

        userFactory.signin = function(payload) {
            return userService.signin(payload).then(function(response) {
                $log.debug('Success: ', response);
                userFactory.setToken(response.data.token);
                userFactory.setUser(response.data.profile);
                return response;
            }, function(reason){
                return $q.reject(reason);
            });
        };

        userFactory.signout = function() {
            return userService.signout();
        };

        userFactory.resendActivation = function(){
            return userService.resendActivation();
        };

        userFactory.activateAccount = function(token){
            var payload = userProvider.activationKey();
            payload.activation_key = token;
            return userService.activateAccount(payload);
        };

        userFactory.checkEmail = function(email){
            return userService.checkEmail(email);
        };


        userFactory.verifyResetToken = function(resetToken) {
            // Calls API through service
            return userService.verifyResetToken(resetToken);
        };

        userFactory.updatePassword = function(payload) {
            // Constructs payload
            var updatePasswordPayload = this.getPasswordFromUser(payload);

            // TODO: Converge with backend to remove extra attributes
            updatePasswordPayload.reset_key = payload.resetToken;
            updatePasswordPayload.new_password = payload.password;

            // Calls API through service
            return userService.updatePassword(updatePasswordPayload);
        };

        /**********
        * MAPPERS *
        **********/

        userFactory.getUserFromSignup = function(signup) {
            var user = userProvider.step2();

            Object.keys(user).forEach(function(key) {
                if (signup[key]) user[key] = signup[key];
            });

            return user;
        };

        userFactory.getUserFromSignin = function(signin) {
            var user = userProvider.full();

            Object.keys(user).forEach(function(key) {
                if (signin[key]) user[key] = signin[key];
            });

            return user;
        };

        userFactory.getPasswordFromUser = function(reset) {
            var payload = userProvider.passwordReset();

            Object.keys(payload).forEach(function(key) {
                if (reset[key]) payload[key] = reset[key];
            });

            return payload;
        };

        return userFactory;
    }
})();
