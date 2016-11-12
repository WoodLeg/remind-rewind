(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts')
        .controller('postsAdminController', PostsAdminController);

    PostsAdminController.$inject = ['graphqlFactory', '$timeout', '$log', '$state'];

    function PostsAdminController(graphqlFactory, $timeout, $log, $state){

        var self = this;

        this.loadPosts = function(){
            graphqlFactory.query('{posts {id title content likes artist{id name} date featured author {id firstName lastName }}}').then(function(response){
                $log.debug('SUCC LIST POSTS: ', response);
                self.posts = response.data.posts;
            }).catch(function(reason){
                $log.debug('ERROR LIST POSTS: ', reason);
            });
        };

        this.goToUser = function(userID){
            $state.go('remindRewind.admin.users.solo', {id: userID});
        };

        this.destroyPost = function(postID){
            graphqlFactory.drestroyPostMutation(postID).then(function(response){
                for (var i = 0; i < self.posts.length; i++) {
                    if (self.posts[i].id === response.data.destroyPost.id) {
                        self.posts.splice(i, 1);
                    }
                }
            }).catch(function(reason){
                $log.debug('ERR DESTROY POST: ', reason);
            });
        };

        this.updateFeaturePost = function(postID, featured){
            graphqlFactory.updateFeaturePost(postID, featured).then(function(response){
                $log.debug(response);
                for (var i = 0; i < self.posts.length; i++) {
                    if (self.posts[i].id === postID){
                        self.posts[i].featured = response.data.updateFeaturedPost.featured;
                    }
                }
            }).catch(function(reason){
                for (var i = 0; i < self.posts.length; i++) {
                    if (self.posts[i].id === postID){
                        self.posts[i].featured = !featured;
                    }
                }
                $log.debug(reason);
            });
        };

        $timeout(function(){
            self.loadPosts();
        });

    }


})();
