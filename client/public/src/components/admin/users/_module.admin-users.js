(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users', [])
        .config(config);

    config.$inject = ['$stateProvider'];


    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin.users', {
                url: '/users',
                views: {
                    'admin': {
                        templateUrl: '/src/components/admin/users/users.html',
                        controller: 'usersAdminController as ctrl'
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
                            });
                            return $q.reject();
                        }
                    }]
                },
                protected: true
            });
    }



})();
