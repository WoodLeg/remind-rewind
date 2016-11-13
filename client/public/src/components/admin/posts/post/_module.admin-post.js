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
            .state('remindRewind.admin.posts.edit', {
                url: '/edit/:id',
                views: {
                    'admin-posts': {
                        templateUrl: '/src/components/admin/posts/post/edit.html',
                        controller: 'postAdminController as ctrl'
                    }
                },
                params: {
                    id: ''
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
                    }],
                    editPost : ['$stateParams', 'graphqlFactory', '$timeout', '$q', '$state', function($stateParams, graphqlFactory, $timeout, $q, $state){
                        return graphqlFactory.query('{post(id: \"'+$stateParams.id+'\") {id title date content author {email} featured online artist{name spotify_id}}}').then(function(response){
                            return response.data.post;
                        }).catch(function(reason){
                            $timeout(function(){
                                $state.go('remindRewind.admin.posts.many');
                                return $q.reject(reason);
                            });
                        });
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
