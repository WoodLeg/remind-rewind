(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists.solo', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin.artists.solo', {
                url: '/:id',
                views: {
                    'admin-artists': {
                        templateUrl: '/src/components/admin/artists/artist/artist.html',
                        controller: 'adminArtistController as ctrl'
                    }
                },
                params: {
                    id: '',
                    artist: null
                },
                resolve: {
                    accessGranted: ['$q', 'userFactory', '$timeout', '$state', function($q, userFactory, $timeout, $state){
                        var user = userFactory.getUser();
                        if (user && ( user.isAdmin || user.isModerator )){
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
