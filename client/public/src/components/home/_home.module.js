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
                resolve: {
                    alreadyLogged: ['$localStorage', '$state', '$timeout', '$q', function($localStorage, $state, $timeout, $q){
                        if ($localStorage.user) {
                            $timeout(function() {
                                $state.go('remindRewind.core.home');
                            }, 0);
                            return $q.reject();
                        }
                    }]
                },
                views: {
                    'content@': {
                        templateUrl: '/src/components/home/home.html',
                        controller: 'homeController as ctrl'
                    },
                    'background@': {
                        templateUrl: '/src/common/background/background.html'
                    }
                }
            });
    }

})();
