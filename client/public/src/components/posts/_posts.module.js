(function(){
    'use strict';

    angular
        .module('remindRewind.posts', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.posts', {
                url: '/posts/:id',
                views: {
                    'content@': {
                        templateUrl: '/src/components/posts/post.html',
                        controller: 'postController as ctrl'
                    }
                },
                params: {
                    id: ''
                },
                resolve: {
                    'post': ['$stateParams', 'graphqlFactory', '$timeout', '$q', '$state', function($stateParams, graphqlFactory, $timeout, $q, $state){
                        return graphqlFactory.query('{post(id: \"'+$stateParams.id+'\") {id title date content author {firstName lastName} artist{ name songkick_id id images {url} albums {name images{url}} events {type name location date room songkick}}}}').then(function(response){
                            return response.data.post;
                        }).catch(function(reason){
                            $timeout(function(){
                                $state.go('remindRewind.home');
                                return $q.reject(reason);
                            });
                        });
                    }]
                }
            });
    }


})();
