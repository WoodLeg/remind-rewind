(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts', [
            'remindRewind.admin.posts.solo'
        ])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin.posts', {
                url: '/posts',
                abstract: true,
                views: {
                    'admin': {
                        templateUrl: '/src/components/admin/posts/index.html'
                    }
                }
            })
            .state('remindRewind.admin.posts.many', {
                url: '',
                views: {
                    'admin-posts': {
                        templateUrl: '/src/components/admin/posts/posts.html',
                        controller: 'postsAdminController as ctrl'
                    }
                },
                resolve: {
                    accessGranted: ['$q', 'userFactory', '$timeout', '$state', function($q, userFactory, $timeout, $state){
                        var user = userFactory.getUser();
                        if (user && (user.isAdmin || user.status === 'moderator')){
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
