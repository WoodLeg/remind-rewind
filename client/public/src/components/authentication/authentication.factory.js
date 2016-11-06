(function() {
    'use strict';

    angular
    .module('remindRewind.authentication')
    .factory('authenticationFactory', AuthenticationFactory);

    AuthenticationFactory.$inject = ['$q', '$rootScope', '$state', '$localStorage', 'userFactory'];

    function AuthenticationFactory($q, $rootScope, $state, $localStorage, userFactory) {

        var authenticationFactory = {};

        var authenticatedUser = userFactory.getUser();

        authenticationFactory.authorize = function() {
            $rootScope.$on('unauthorized', function() {
                $state.go('remindRewind.signin');
            });
        };

        authenticationFactory.getAuthenticatedUser = function() {
            authenticatedUser = userFactory.getUser();
            // Contrary to the userFactory, this will send an actionable promise
            var deferred = $q.defer();
            if (authenticatedUser) {
                deferred.resolve(authenticatedUser);
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        authenticationFactory.setAuthenticatedUser = function(user) {
            authenticatedUser = user;
        };


        return authenticationFactory;
    }
})();
