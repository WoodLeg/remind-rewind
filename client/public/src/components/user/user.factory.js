(function() {
    'use strict';

    angular
    .module('remindRewind.user')
    .factory('userFactory', UserFactory);

    UserFactory.$inject = ['$q', '$localStorage', 'userService', 'userProvider', '$log', '$window'];

    function UserFactory($q, $localStorage, userService, userProvider, $log, $window) {
        var user = null;
        var userFactory = {};

        userFactory.setUser = function(obj) {
            user = obj;
            $localStorage.user = angular.toJson(user);
        };

        userFactory.getUser = function() {
            if (!user) user = angular.fromJson($localStorage.user);
            return user;
        };

        userFactory.setToken = function(token){
            $localStorage.token = token;
        };

        userFactory.clean = function(){
            delete $localStorage.token;
            delete $localStorage.user;
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
                userFactory.setUser(response.data.user);
                $window.Intercom("update", {
                    app_id: "sager85e",
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
                return response;
            }, function(reason){
                return $q.reject(reason);
            });
        };

        userFactory.signout = function() {
            return userService.signout();
        };

        return userFactory;
    }
})();
