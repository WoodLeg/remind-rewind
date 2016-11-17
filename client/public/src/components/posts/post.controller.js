(function(){
    'use strict';

    angular
        .module('remindRewind.posts')
        .controller('postController', PostController);

    PostController.$inject = ['$stateParams', 'graphqlFactory', '$timeout', '$log', 'post'];

    function PostController($stateParams, graphqlFactory, $timeout, $log, post){
        var self = this;

        self.post = post;
        this.albumDetail = null;

        $log.debug(this.albumDetail);

        this.getAlbum  = function(id){
            graphqlFactory.query('query { album (id: \"'+id+'\"){ id name label images {url} tracks{id name duration track_number}}}').then(function(response){
                $log.debug('GET ALBUM SUCCESS:' , response);
                self.albumDetail = response.data.album;
            }).catch(function(reason){
                $log.debug('GET ALBUM FAILED: ', reason);
            });
        };

        this.resetAlbum = function(){
            self.albumDetail = null;
        };

    }


})();
