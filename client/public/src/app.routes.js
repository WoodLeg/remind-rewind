(function(){
    'use strict';

    angular
        .module('remindRewind')
        .config(config);

    config.$inject  = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('remindRewind', {
                url: '',
                abstract: true
            });
    }

})();
