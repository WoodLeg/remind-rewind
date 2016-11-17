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

        this.getAlbum  = function(id){
            graphqlFactory.query('query { album (id: \"'+id+'\"){ id name label images {url} tracks{id name duration track_number}}}').then(function(response){
                $log.debug('GET ALBUM SUCCESS:' , response);
            }).catch(function(reason){
                $log.debug('GET ALBUM FAILED: ', reason);
            });
        }

    }


})();
