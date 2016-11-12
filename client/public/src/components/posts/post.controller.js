(function(){
    'use strict';

    angular
        .module('remindRewind.posts')
        .controller('postController', PostController);

    PostController.$inject = ['$stateParams', 'graphqlFactory', '$timeout', '$log'];

    function PostController($stateParams, graphqlFactory, $timeout, $log){
        var self = this;

        this.getPost = function(){
            graphqlFactory.query('{post(id: \"'+$stateParams.id+'\") {id title date content author {firstName lastName} artist{ name id images {url} albums {name}}}}').then(function(response){
                $log.debug(response);
                self.post = response.data.post;
            }).catch(function(reason){
                $log.debug(reason);
            });
        };

        $timeout(function(){
            self.getPost();
        });

    }


})();
