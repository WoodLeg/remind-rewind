(function(){
    'use strict';

    angular
        .module('remindRewind.spinner')
        .factory('spinnerInterceptor', SpinnerInterceptor);


    SpinnerInterceptor.$inject = ['$q', '$log', '$rootScope', '$filter', '$sessionStorage'];

    function SpinnerInterceptor($q, $log, $rootScope, $filter, $sessionStorage){

        var spinnerInterceptor = {};

        spinnerInterceptor.httpInterceptor = {
            'request': function(config){
                $rootScope.$broadcast('spinner', true);
                return config;
            },
            'response': function(response){
                $rootScope.$broadcast('spinner', false);
                return response;
            },
            'responseError': function(response){
                $rootScope.$broadcast('spinner', false);
                return $q.reject(response);
            }
        };

        return spinnerInterceptor.httpInterceptor;

    }


})();
