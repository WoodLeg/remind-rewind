(function(){
    'use strict';

    angular
        .module('remindRewind.animicons')
        .controller('animiController', AnimiController);

    AnimiController.$inject = ['$log', 'userFactory', 'graphqlFactory'];


    function AnimiController($log, userFactory, graphqlFactory){

        var self = this;

        $log.debug(this.isLiked);
        this.updateLikePost = function(){
            $log.debug('UserId: ', userFactory.getUser().id);
            $log.debug('User liked it: ', this.isLiked);
            $log.debug('Post ID: ', this.postId)
            graphqlFactory.updateLikesPostMutation(self.postId, userFactory.getUser().id, !this.isLiked).then(function(response){
                $log.debug('Response update like post: ', response);
                self.likes = response.data.updateLikes.likes.length;
                if (response.data.updateLikes.likes.indexOf(userFactory.getUser().id) > -1){
                    self.isLiked = true;
                } else {
                    self.isLiked = false;
                }
            }).catch(function(reason){
                $log.debug('FAILED UPDATED LIKE POST: ', reason);
            });
        };


    }

})();
