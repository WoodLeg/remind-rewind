(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts.solo', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin.posts.add', {
                url: '/add',
                views: {
                    'admin-posts': {
                        templateUrl: '/src/components/admin/posts/post/add.html',
                        controller: 'postAdminController as ctrl'
                    }
                },
                resolve: {
                    accessGranted: ['$q', 'userFactory', '$timeout', '$state', function($q, userFactory, $timeout, $state){
                        var user = userFactory.getUser();
                        if (user && (user.isAdmin || user.isModerator)){
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
            })
            .state('remindRewind.admin.posts.solo', {
                url: '/:id',
                views: {
                    'admin-posts': {
                        templateUrl: '/src/components/admin/posts/post/post.html',
                        controller: 'postAdminController as ctrl'
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
