(function(){
    'use strict';

    angular
        .module('remindRewind.admin', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
        .state('remindRewind.admin', {
            url: '/admin',
            views: {
                'content@': {
                    templateUrl: '/src/components/admin/admin.html',
                    controller: 'adminController as ctrl'
                }
            },
            resolve: {
                accessGranted: ['$q', 'userFactory', '$timeout', '$state', function($q, userFactory, $timeout, $state){
                    var user = userFactory.getUser();
                    if (user && user.isAdmin){
                        return true;
                    } else {
                        $timeout(function() {
                            $state.go('remindRewind.home');
                        }, 0);
                        return $q.reject();
                    }
                }]
            },
            protected: true
        });
    }


})();
