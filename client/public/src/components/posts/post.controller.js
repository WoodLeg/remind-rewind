(function(){
    'use strict';

    angular
        .module('remindRewind.posts')
        .controller('postController', PostController);

    PostController.$inject = ['$stateParams', 'graphqlFactory', '$timeout', '$log', 'post'];

    function PostController($stateParams, graphqlFactory, $timeout, $log, post){
        var self = this;

        self.post = post;

        $log.debug(this.post);

    }


})();
