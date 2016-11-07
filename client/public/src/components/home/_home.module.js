(function() {
    'use strict';

    angular
    .module('remindRewind.home', [])
    .config(config);

    config.$inject  = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('remindRewind.home', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: '/src/components/home/home.html',
                        controller: 'homeController as ctrl'
                    }
                }
            });
    }

})();
