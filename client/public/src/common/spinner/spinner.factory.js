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
                $rootScope.$broadcast('spinner', {status: true});
                return config;
            },
            'response': function(response){
                if (!$sessionStorage.pollingInProgress) {
                    $rootScope.$broadcast('spinner', {status: false});
                    $rootScope.$broadcast('spinner-msg', {msg: $filter('translate')('SPINNER.GENERIC')});
                }
                return response;
            },
            'responseError': function(response){
                $rootScope.$broadcast('spinner', {status: false});
                $rootScope.$broadcast('spinner-msg', {msg: $filter('translate')('SPINNER.GENERIC')});
                return $q.reject(response);
            }
        };

        return spinnerInterceptor.httpInterceptor;

    }


})();
