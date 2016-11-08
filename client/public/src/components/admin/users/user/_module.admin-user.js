(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users.solo', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin.users.solo', {
                url: '/:id',
                views: {
                    'admin-users': {
                        templateUrl: '/src/components/admin/users/user/user.html',
                        controller: 'userAdminController as ctrl'
                    }
                },
                resolve: {
                    accessGranted: ['$q', 'userFactory', '$timeout', '$state', function($q, userFactory, $timeout, $state){
                        var user = userFactory.getUser();
                        if (user && (user.isAdmin || user.isModerator )){
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
