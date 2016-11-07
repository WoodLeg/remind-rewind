(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin.artists', {
                url: '/artists',
                views: {
                    'admin': {
                        templateUrl: '/src/components/admin/artists/artists.html',
                        controller: 'artistsAdminController as ctrl'
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
