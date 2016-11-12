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
                }
            });
    }


})();
