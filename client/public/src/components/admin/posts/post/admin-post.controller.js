(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts.solo')
        .controller('postAdminController', PostAdminController);

    PostAdminController.$inject = ['userFactory', 'graphqlFactory', '$log', '$state', '$timeout', 'editPost'];

    function PostAdminController(userFactory, graphqlFactory, $log, $state, $timeout, editPost){

        var self = this;
        this.user = userFactory.getUser();
        this.artistsListDisplay = false;
        if (editPost){
            this.editPost = editPost;
            this.editPost.content = this.editPost.content.replace(/<br\s*[\/]?>/gi, "\n");
        }


        this.createPost = function(){
            graphqlFactory.addPostMutation(self.newPost, this.user.id).then(function(){
                $state.go('remindRewind.admin.posts.many');
            }).catch(function(reason){
                $log.debug('ERR ADD POST: ', reason);
            });
        };

        this.editPostSubmit = function(){
            graphqlFactory.editPostMutation(self.editPost).then(function(){
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

        this.updateFeaturePost = function(postID, featured){
            graphqlFactory.updateFeaturePost(postID, featured).then(function(response){
                $log.debug(response);
                self.editPost.featured = response.data.updateFeaturedPost.featured;
            }).catch(function(reason){
                self.editPost = !featured;
                $log.debug(reason);
            });
        };

        this.updateOnlinePost = function(postID, featured){
            graphqlFactory.updateOnlinePost(postID, featured).then(function(response){
                $log.debug(response);
                self.editPost.online = response.data.updateOnlinePost.online;
            }).catch(function(reason){
                self.editPost = !featured;
                $log.debug(reason);
            });
        };

        this.selectedArtist = function(id){
            self.newPost.artist = id;
        };

        this.editSelectedArtist = function(id){
            self.editPost.artist = id;
        };

        $timeout(function(){
            self.displayArtistsList();
        });



    }


})();
