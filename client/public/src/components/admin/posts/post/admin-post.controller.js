(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts.solo')
        .controller('postAdminController', PostAdminController);

    PostAdminController.$inject = ['userFactory', 'graphqlFactory', '$log', '$state', '$timeout'];

    function PostAdminController(userFactory, graphqlFactory, $log, $state, $timeout){

        var self = this;
        this.user = userFactory.getUser();
        this.artistsListDisplay = false;

        this.createPost = function(){
            graphqlFactory.addPostMutation(self.newPost, this.user.id).then(function(){
                $state.go('remindRewind.admin.posts.many');
            }).catch(function(reason){
                $log.debug('ERR ADD POST: ', reason);
            });
        };

        this.displayArtistsList = function(){
            graphqlFactory.query('{artists {name spotify_id}}').then(function(response){
                self.artistsList = response.data.artists;
                self.artistsListDisplay = true;
            });
        };

        this.selectedArtist = function(id){
            self.newPost.artist = id;
        };

        $timeout(function(){
            self.displayArtistsList();
        });

    }


})();
