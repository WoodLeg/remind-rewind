(function() {

    'use strict';

  // Factory declaration
    angular
        .module('remindRewind.user')
        .factory('authHttpResponseInterceptor', AuthHttpResponseInterceptor);

    // Depencies injection
    AuthHttpResponseInterceptor.$inject = ['$localStorage', '$q', '$rootScope'];

    // Factory implementation
    function AuthHttpResponseInterceptor($localStorage, $q, $rootScope){
        return {
            request: function(config) {
                config.headers = config.headers || {};
                var token = $localStorage.userToken;
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config || $q.when(config);
            },
            response: function(response){
                if(response.headers('Authorization')){
                    $localStorage.userToken = response.headers('Authorization');
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    $localStorage.$reset();
                    $rootScope.$broadcast('unauthorized');
                }
                return $q.reject(rejection);
            }
        };
    }

})();
